import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'fs/promises'
import { join } from 'path'

const IMAGES_DIR = './public/images'
const MAX_WIDTH = 1200
const QUALITY = 80

async function compressImages() {
  console.log('🖼️  Compressing images in', IMAGES_DIR)
  console.log(`   Max width: ${MAX_WIDTH}px, Quality: ${QUALITY}%\n`)

  const files = await readdir(IMAGES_DIR)
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  let totalBefore = 0
  let totalAfter = 0

  for (const file of imageFiles) {
    const filePath = join(IMAGES_DIR, file)
    const tempPath = join(IMAGES_DIR, `_temp_${file}`)
    const beforeStats = await stat(filePath)
    const beforeSize = beforeStats.size
    totalBefore += beforeSize

    try {
      const image = sharp(filePath)
      const metadata = await image.metadata()

      // Only resize if wider than MAX_WIDTH
      const resizeOptions = metadata.width > MAX_WIDTH
        ? { width: MAX_WIDTH, withoutEnlargement: true }
        : {}

      // Compress to temp file first
      await image
        .resize(resizeOptions)
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(tempPath)

      // Replace original with compressed version
      await unlink(filePath)
      await rename(tempPath, filePath)

      const afterStats = await stat(filePath)
      const afterSize = afterStats.size
      totalAfter += afterSize
      const savings = ((beforeSize - afterSize) / beforeSize * 100).toFixed(1)

      console.log(`✓ ${file}`)
      console.log(`  ${(beforeSize / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB (-${savings}%)\n`)
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`)
      // Clean up temp file if it exists
      try { await unlink(tempPath) } catch {}
    }
  }

  const totalSavings = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)
  console.log('─'.repeat(40))
  console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB (-${totalSavings}%)`)
}

compressImages()
