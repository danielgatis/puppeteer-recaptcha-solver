const undici = require('undici')

function rdn(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

async function waitForFrame(page, urlPart) {
  let frame = page.frames().find(f => f.url().includes(urlPart))
  if (frame) return frame

  return new Promise(resolve => {
    page.on('framenavigated', function onFrame(f) {
      if (f.url().includes(urlPart)) {
        page.off('framenavigated', onFrame)
        resolve(f)
      }
    })
  })
}

async function solve(page) {
  try {
    console.log('[1] waiting for anchor frame...')
    const anchorFrame = await waitForFrame(page, 'api2/anchor')
    await anchorFrame.waitForSelector('#recaptcha-anchor')
    console.log('[1] anchor frame ready')

    const checkbox = await anchorFrame.$('#recaptcha-anchor')
    console.log('[2] clicking checkbox...')
    await checkbox.click({ delay: rdn(30, 150) })

    console.log('[3] waiting for challenge bframe...')
    let imageFrame
    try {
      await anchorFrame.waitForFunction(() => {
        return !document.querySelector('#recaptcha-anchor[aria-checked="true"]')
      }, { timeout: 5000 })

      imageFrame = await waitForFrame(page, 'api2/bframe')
      await imageFrame.waitForSelector('.rc-image-tile-wrapper img', { timeout: 5000 })
      console.log('[3] challenge appeared')
    } catch (e) {
      console.log('[3] no challenge, done')
      return
    }

    const audioButton = await imageFrame.$('#recaptcha-audio-button')
    console.log('[4] clicking audio button...')
    await audioButton.click({ delay: rdn(30, 150) })

    let iteration = 0
    while (true) {
      iteration++
      console.log(`[loop ${iteration}] waiting for audio download link...`)
      try {
        await imageFrame.waitForSelector('.rc-audiochallenge-tdownload-link', { timeout: 5000 })
      } catch (e) {
        console.error(`[loop ${iteration}] timeout waiting for audio link:`, e.message)
        continue
      }
      console.log(`[loop ${iteration}] audio link found`)

      const audioLink = await imageFrame.$eval('#audio-source', el => el.src)
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
          anchorFrame.waitForFunction(() => {
            return !!document.querySelector('#recaptcha-anchor[aria-checked="true"]')
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
