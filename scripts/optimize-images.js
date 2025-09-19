const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const fileExt = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(fileExt)) {
      const fileStats = fs.statSync(filePath);
      const fileSizeMB = fileStats.size / (1024 * 1024);
      
      console.log(`Processing ${file} (${fileSizeMB.toFixed(2)}MB)...`);
      
      try {
        // For large PNG files, convert to WebP with high compression
        if (fileExt === '.png' && fileSizeMB > 1) {
          const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
          await sharp(filePath)
            .webp({ quality: 80, effort: 6 })
            .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
            .toFile(outputPath);
          console.log(`✅ Converted ${file} to WebP`);
        }
        // For regular optimization
        else {
          const outputPath = path.join(outputDir, file);
          
          if (fileExt === '.webp') {
            await sharp(filePath)
              .webp({ quality: 85, effort: 4 })
              .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
              .toFile(outputPath);
          } else if (['.jpg', '.jpeg'].includes(fileExt)) {
            await sharp(filePath)
              .jpeg({ quality: 85, progressive: true })
              .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
              .toFile(outputPath);
          } else if (fileExt === '.png') {
            await sharp(filePath)
              .png({ quality: 90, compressionLevel: 9 })
              .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
              .toFile(outputPath);
          }
          
          console.log(`✅ Optimized ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);