import sharp from "sharp";
import { globSync } from "glob";
import path from "path";
import fs from "fs";

const ASSETS_DIR = "src/assets";

// Find all JPG and PNG files (skip already-converted avif/webp)
const jpgFiles = globSync(`${ASSETS_DIR}/**/*.jpg`);
const pngFiles = globSync(`${ASSETS_DIR}/**/*.png`);
const webpFiles = globSync(`${ASSETS_DIR}/**/*.webp`);

const allFiles = [...jpgFiles, ...pngFiles];

console.log(`Found ${allFiles.length} JPG/PNG files to convert to AVIF + WebP`);
console.log(`Found ${webpFiles.length} WebP files to convert to AVIF only`);

for (const file of allFiles) {
  const parsed = path.parse(file);
  const base = path.join(parsed.dir, parsed.name);

  const avifPath = `${base}.avif`;
  const webpPath = `${base}.webp`;

  if (!fs.existsSync(avifPath)) {
    await sharp(file).avif({ quality: 65 }).toFile(avifPath);
    console.log(`  AVIF: ${avifPath}`);
  }

  if (!fs.existsSync(webpPath)) {
    await sharp(file).webp({ quality: 75 }).toFile(webpPath);
    console.log(`  WebP: ${webpPath}`);
  }
}

// For existing WebP files, generate AVIF versions
for (const file of webpFiles) {
  const parsed = path.parse(file);
  const base = path.join(parsed.dir, parsed.name);
  const avifPath = `${base}.avif`;

  if (!fs.existsSync(avifPath)) {
    await sharp(file).avif({ quality: 65 }).toFile(avifPath);
    console.log(`  AVIF: ${avifPath}`);
  }
}

console.log("Done!");
