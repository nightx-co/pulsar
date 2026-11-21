import { $, Glob } from "bun";  console.log("Building SDK...");

async function runBuild() {
    const startTime = performance.now();
    await $`rm -rf dist`;

    const result = await Bun.build({
        entrypoints: [
            "./src/index.ts",
            "./src/storage/index.ts",
            "./src/server/index.ts",
            "./src/integrations/index.ts",
        ],
        outdir: "./dist",
        target: "node",
        format: "esm",
        sourcemap: "external",
        minify: true,
        
        loader: { ".lua": "text" },
        external: ["redis", "ioredis", "postgres", "js-sha256", "crossws", "srvx", "msgpack", "typescript"],

        splitting: true,   // crucial for shared modules chunks.

        banner: "/**\n * Pulsar by NightX\n * Copyright (c) " + new Date().getFullYear() + " NightX. All rights reserved.\n */",
        footer: "/* Powered by NightX - Pulsar Engine */",

        define: {
            "process.env.APP_NAME": JSON.stringify("Pulsar"),
            "process.env.COMPANY_NAME": JSON.stringify("NightX"),
        },
    });

    if (!result.success) {
        console.error("Build failed:", result.logs);
        process.exit(1);
    }

    await $`bunx tsc -p tsconfig.json`;

    for await (const path of new Glob("dist/**/*.d.ts").scan(".")) {
        const file = Bun.file(path);
        const text = await file.text();
        const fixed = text.replace(
            /(from\s+["']|import\(["'])(\.{1,2}\/[^"']+?)\.ts(["'])/g,
            "$1$2.d.ts$3"
        );
        if (fixed !== text) await Bun.write(path, fixed);
    }

    console.log("Packing tarball...");
    await $`bun pm pack`;
    await $`mkdir -p ./builds`;

    for await (const path of new Glob("*.tgz").scan(".")) {
        await $`mv ${path} ./builds/`;
        console.log(`Moved ${path} to ./builds/`);
    }

    const pkgFile = Bun.file("package.json");
    const pkgData = await pkgFile.json();
    const currentVersion = pkgData.version;

    const metaPath = "./builds/meta.json";
    const metaFile = Bun.file(metaPath);
    let previousMeta: any = null;
    if (await metaFile.exists()) {
        try {
            previousMeta = await metaFile.json();
        }
        catch {}
    }

    const buildDurationMs = Math.round(performance.now() - startTime);

    const metaData = {
        lastInstalledVersion: previousMeta?.currentVersion || currentVersion,
        currentVersion: currentVersion,
        lastBuildTimestamp: new Date().toISOString(),
        buildDurationMs: buildDurationMs,
        fastestBuildMs: previousMeta?.fastestBuildMs 
            ? Math.min(previousMeta.fastestBuildMs, buildDurationMs) 
            : buildDurationMs,
    }

    await Bun.write(metaPath, JSON.stringify(metaData, null, 2));

    console.log(`SDK successfully built and packed in ./builds (Took ${buildDurationMs}ms)`);
}

runBuild();