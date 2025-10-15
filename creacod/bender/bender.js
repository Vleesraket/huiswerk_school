let rafToken = 0

function transformPixels(dstImageData, srcImageData, t) {
    const dst = dstImageData.data
    const src = srcImageData.data
    const width = srcImageData.width
    const height = srcImageData.height

    const ax = 6, ay = 6          // wave amplitude
    const wl = 40                 // wavelength
    const spx = 2.0, spy = 1.6    // wave speeds
    const tile = 16               // checker tile size
    const phase = t * 60          // checker scroll speed
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.5) // subtle pulsing

    for (let y = 0; y < height; y++) {
        const yOff = y * width
        // precompute wave offsets for this row
        const offX = ax * Math.sin((y / wl) + t * spx)

        for (let x = 0; x < width; x++) {
            const offY = ay * Math.sin((x / wl) + t * spy)

            let sx = x + offX
            let sy = y + offY

            if (sx < 0) sx = 0
            else if (sx >= width) sx = width - 1
            if (sy < 0) sy = 0
            else if (sy >= height) sy = height - 1

            const sIdx = ((sy | 0) * width + (sx | 0)) * 4
            const dIdx = (yOff + x) * 4

            const r0 = src[sIdx]
            const g0 = src[sIdx + 1]
            const b0 = src[sIdx + 2]
            const a0 = src[sIdx + 3]

            const checker = ((((x + phase) / tile) | 0) + (((y + phase) / tile) | 0)) & 1

            let r, g, b
            if (checker === 0) {
                r = r0 + 30 * pulse
                g = g0 - 15 * pulse
                b = b0 - 15 * pulse
            } else {
                r = r0 - 15 * pulse
                g = g0 + 30 * pulse
                b = b0 - 15 * pulse
            }

            dst[dIdx]     = r < 0 ? 0 : r > 255 ? 255 : r
            dst[dIdx + 1] = g < 0 ? 0 : g > 255 ? 255 : g
            dst[dIdx + 2] = b < 0 ? 0 : b > 255 ? 255 : b
            dst[dIdx + 3] = a0
        }
    }
}

function transformImage(img) {
    const canvas = document.getElementById('imageCanvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const width = img.width
    const height = img.height
    canvas.width = width
    canvas.height = height

    // Draw source to an offscreen canvas once
    const srcCanvas = document.createElement('canvas')
    const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true })
    srcCanvas.width = width
    srcCanvas.height = height
    srcCtx.drawImage(img, 0, 0)

    const srcImageData = srcCtx.getImageData(0, 0, width, height)
    const dstImageData = ctx.createImageData(width, height)

    // stop previous animation loop
    const myToken = ++rafToken

    function frame(time) {
        if (myToken !== rafToken) return
        const t = time * 0.001
        transformPixels(dstImageData, srcImageData, t)
        ctx.putImageData(dstImageData, 0, 0)
        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

document.getElementById('imageLoader').addEventListener('change', function (e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => transformImage(img)
        img.src = event.target.result
    }
    reader.readAsDataURL(file)
})

const img = new Image()
img.onload = () => transformImage(img)
img.src = 'img.png'