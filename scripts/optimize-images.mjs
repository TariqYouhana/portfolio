import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const MANIFEST_PATH = path.join(IMAGES_DIR, "blur-manifest.json");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getImages(fullPath)));
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      // Skip already generated derivative sizes
      if (!entry.name.includes("-400w.") && !entry.name.includes("-1200w.")) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

export async function processImages() {
  if (!(await fileExists(IMAGES_DIR))) {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
    console.log("Created public/images directory.");
  }

  const rawImages = await getImages(IMAGES_DIR);
  if (rawImages.length === 0) {
    console.log("No source images found in public/images. Pipeline ready for when photos are added.");
    // Write empty manifest if not present
    if (!(await fileExists(MANIFEST_PATH))) {
      await fs.writeFile(MANIFEST_PATH, JSON.stringify({}, null, 2));
    }
    return;
  }

  let manifest = {};
  if (await fileExists(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf-8"));
    } catch {
      manifest = {};
    }
  }

  console.log(`Processing ${rawImages.length} images...`);

  for (const imagePath of rawImages) {
    const relative = path.relative(IMAGES_DIR, imagePath).replace(/\\/g, "/");
    const parsed = path.parse(imagePath);

    // 1. Generate 1200px web-ready WebP (stripping EXIF metadata)
    const out1200 = path.join(parsed.dir, `${parsed.name}-1200w.webp`);
    if (!(await fileExists(out1200))) {
      await sharp(imagePath)
        .rotate() // auto-orient based on EXIF before stripping
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out1200);
      console.log(`✓ Generated 1200w WebP: ${relative}`);
    }

    // 2. Generate 400px mobile-ready WebP (stripping EXIF metadata)
    const out400 = path.join(parsed.dir, `${parsed.name}-400w.webp`);
    if (!(await fileExists(out400))) {
      await sharp(imagePath)
        .rotate()
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(out400);
      console.log(`✓ Generated 400w WebP: ${relative}`);
    }

    // 3. Compute base64 blur placeholder
    if (!manifest[relative]) {
      const buffer = await sharp(imagePath)
        .rotate()
        .resize({ width: 24 })
        .webp({ quality: 20 })
        .toBuffer();
      manifest[relative] = `data:image/webp;base64,${buffer.toString("base64")}`;
      console.log(`✓ Computed blur placeholder for: ${relative}`);
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log("Image optimization complete. Manifest updated.");
}

// Execute when run directly
processImages().catch((err) => {
  console.error("Error processing images:", err);
  process.exit(1);
});
