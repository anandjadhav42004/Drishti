import { execFile as execFileCallback } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { promisify } from "node:util";

import { stitch } from "@google/stitch-sdk";

const execFile = promisify(execFileCallback);

const PROJECT_ID = "8667863899280395890";
const OUTPUT_DIR = "stitch_exports";

const screens = [
  {
    name: "Design System",
    id: "asset-stub-assets-d98dba33492f4efc8580c528a3760c87-1779338084499",
    slug: "01-design-system",
  },
  {
    name: "DRISHTI Dashboard",
    id: "bed7d7269e254de893275d26672addb9",
    slug: "02-drishti-dashboard",
  },
  {
    name: "DRISHTI Tactical Dashboard",
    id: "bfb6f75add8a4c47b9d87b0e2c2ab0cc",
    slug: "03-drishti-tactical-dashboard",
  },
  {
    name: "DRISHTI Tactical Startup Prototype",
    id: "e8207144f99648cea6027a29cc2c8ad7",
    slug: "04-drishti-tactical-startup-prototype",
  },
];

async function curlDownload(url, outputPath) {
  await execFile("curl", ["-L", url, "-o", outputPath], {
    maxBuffer: 1024 * 1024 * 20,
  });
}

async function exportScreen(project, screenConfig) {
  const screen = project.screen(screenConfig.id);
  const [htmlUrl, imageUrl] = await Promise.all([screen.getHtml(), screen.getImage()]);

  const screenDir = join(OUTPUT_DIR, screenConfig.slug);
  await mkdir(screenDir, { recursive: true });

  const htmlPath = join(screenDir, "screen.html");
  const imagePath = join(screenDir, "screen.png");
  const metadataPath = join(screenDir, "metadata.json");

  await Promise.all([curlDownload(htmlUrl, htmlPath), curlDownload(imageUrl, imagePath)]);

  await writeFile(
    metadataPath,
    JSON.stringify(
      {
        projectId: PROJECT_ID,
        name: screenConfig.name,
        screenId: screenConfig.id,
        htmlUrl,
        imageUrl,
        files: {
          html: basename(htmlPath),
          image: basename(imagePath),
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Exported ${screenConfig.name} -> ${screenDir}`);
}

async function main() {
  if (
    !process.env.STITCH_API_KEY &&
    !(process.env.STITCH_ACCESS_TOKEN && process.env.GOOGLE_CLOUD_PROJECT)
  ) {
    throw new Error(
      "Missing Stitch auth. Set STITCH_API_KEY, or set both STITCH_ACCESS_TOKEN and GOOGLE_CLOUD_PROJECT.",
    );
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  const project = stitch.project(PROJECT_ID);

  for (const screen of screens) {
    try {
      await exportScreen(project, screen);
    } catch (error) {
      console.error(`Failed to export ${screen.name} (${screen.id})`);
      console.error(error);
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
