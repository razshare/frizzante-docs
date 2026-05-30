import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
const file = fileURLToPath(import.meta.url)
const dir = path.dirname(file).replace(/\\+/, "/")
const dev = (process.env.DEV ?? "0") === "1"
const prefix = process.env.PREFIX ?? ""
console.log(`using prefix - "${prefix}"`)
let sourcemap: "inline" | boolean = false
if (dev) {
    sourcemap = "inline"
}
// https://vite.dev/config/
export default defineConfig({
    base: prefix,
    plugins: [
        tailwindcss(),
        svelte({
            compilerOptions: {
                css: "injected",
            },
        }),
    ],
    resolve: {
        alias: {
            "$lib": `${path.resolve(dir, "./lib")}`,
            "$gen": `${path.resolve(dir, "../.gen")}`,
            "$exports.client": `${path.resolve(dir, "./exports.client.ts")}`,
            "$exports.server": `${path.resolve(dir, "./exports.server.ts")}`,
        },
    },
    build: {
        sourcemap,
        copyPublicDir: true,
        rollupOptions: {
            input: {
                index: "./index.html",
            },
            output: {
                chunkFileNames: `chunks/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
})
