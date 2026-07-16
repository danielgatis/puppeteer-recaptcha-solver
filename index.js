const undici = require('undici')

function rdn(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

async function solve(page) {
  try {
    console.log('[1] waiting for anchor iframe...')
    await page.waitForFunction(() => {
      const iframe = document.querySelector('iframe[src*="api2/anchor"]')
      if (!iframe) return false

      return !!iframe.contentWindow.document.querySelector('#recaptcha-anchor')
    })
    console.log('[1] anchor iframe ready')

    let frames = await page.frames()
    const recaptchaFrame = frames.find(frame => frame.url().includes('api2/anchor'))

    const checkbox = await recaptchaFrame.$('#recaptcha-anchor')
    console.log('[2] clicking checkbox...')
    await checkbox.click({ delay: rdn(30, 150) })

    console.log('[3] waiting for challenge bframe...')
    const challenge = await page.waitForFunction(() => {
      let iframe = document.querySelector('iframe[src*="api2/anchor"]')
      if(iframe == null || !!iframe.contentWindow.document.querySelector('#recaptcha-anchor[aria-checked="true"]')){
        return false
      }

      iframe = document.querySelector('iframe[src*="api2/bframe"]')
      if (!iframe || !iframe.contentWindow) return false
      const img = iframe.contentWindow.document.querySelector('.rc-image-tile-wrapper img')
      if (img && img.complete) {
        return true
      }

      return false
    }, { timeout: 5000 })

    if (!challenge) {
      console.log('[3] no challenge, done')
      return
    }
    console.log('[3] challenge appeared')

    frames = await page.frames()
    const imageFrame = frames.find(frame => frame.url().includes('api2/bframe'))
    const audioButton = await imageFrame.$('#recaptcha-audio-button')
    console.log('[4] clicking audio button...')
    await audioButton.click({ delay: rdn(30, 150) })

    let iteration = 0
    while (true) {
      iteration++
      console.log(`[loop ${iteration}] waiting for audio download link...`)
      try {
        await page.waitForFunction(() => {
          const iframe = document.querySelector('iframe[src*="api2/bframe"]')
          if (!iframe) return false

          return !!iframe.contentWindow.document.querySelector('.rc-audiochallenge-tdownload-link')
        }, { timeout: 5000 })
      } catch (e) {
        console.error(`[loop ${iteration}] timeout waiting for audio link:`, e.message)
        continue
      }
      console.log(`[loop ${iteration}] audio link found`)

      const audioLink = await page.evaluate(() => {
        const iframe = document.querySelector('iframe[src*="api2/bframe"]')
        return iframe.contentWindow.document.querySelector('#audio-source').src
      })
      console.log(`[loop ${iteration}] audio link:`, audioLink)

      const audioBytes = await page.evaluate(audioLink => {
        return (async () => {
          const response = await window.fetch(audioLink)
          const buffer = await response.arrayBuffer()
          return Array.from(new Uint8Array(buffer))
        })()
      }, audioLink)
      console.log(`[loop ${iteration}] audio bytes fetched: ${audioBytes.length}`)

      const response = await undici.fetch('https://api.wit.ai/speech?v=20220622', {
        method: 'POST',
        body: new Uint8Array(audioBytes),
        headers: {
          Authorization: 'Bearer JVHWCNWJLWLGN6MFALYLHAPKUFHMNTAC',
          'Content-Type': 'audio/mpeg3'
        }
      }).then((res) => res.text())
      console.log(`[loop ${iteration}] wit.ai response:`, response)

      let audioTranscript = null

      try {
        const matches = [...response.matchAll(/"text":\s*"([^"]+)"/g)]
        audioTranscript = matches[matches.length - 1][1].trim()
        console.log(`[loop ${iteration}] transcript:`, audioTranscript)
      } catch (e) {
        console.log(`[loop ${iteration}] transcript parse failed, reloading...`)
        const reloadButton = await imageFrame.$('#recaptcha-reload-button')
        await reloadButton.click({ delay: rdn(30, 150) })
        continue
      }

      const input = await imageFrame.$('#audio-response')
      await input.click({ delay: rdn(30, 150) })
      await input.type(audioTranscript, { delay: rdn(30, 75) })
      console.log(`[loop ${iteration}] typed transcript, clicking verify...`)

      const verifyButton = await imageFrame.$('#recaptcha-verify-button')
      await verifyButton.click({ delay: rdn(30, 150) })

      console.log(`[loop ${iteration}] waiting for result (error msg or anchor checked)...`)
      try {
        await Promise.race([
          imageFrame.waitForFunction(() => {
            const error = document.querySelector('.rc-audiochallenge-error-message')
            return !!(error && error.innerText && error.innerText.trim().length > 0)
          }, { timeout: 5000 }),
          page.waitForFunction(() => {
            const anchor = document.querySelector('iframe[src*="api2/anchor"]')
            if (!anchor || !anchor.contentWindow) return false
            return !!anchor.contentWindow.document.querySelector('#recaptcha-anchor[aria-checked="true"]')
          }, { timeout: 5000 })
        ])
      } catch (e) {
        console.log(`[loop ${iteration}] timeout waiting for result, retrying...`)
        continue
      }

      const needsMore = await imageFrame.evaluate(() => {
        const error = document.querySelector('.rc-audiochallenge-error-message')
        const text = error && error.innerText ? error.innerText.trim() : ''
        return { needsMore: text.length > 0, errorText: text }
      })
      console.log(`[loop ${iteration}] needsMore:`, needsMore)

      if (needsMore.needsMore) {
        console.log(`[loop ${iteration}] need more solutions, continuing...`)
        continue
      }

      const token = await page.evaluate(() => document.getElementById('g-recaptcha-response').value)
      console.log(`[loop ${iteration}] SUCCESS! token length:`, token.length)
      return token
    }
  } catch (e) {
    console.error('[solve] fatal error:', e)
  }
}

module.exports = solve
