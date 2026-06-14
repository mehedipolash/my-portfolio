// Build-time pre-rendering for SEO.
// 1. Builds an SSR bundle of the App (entry-server.jsx).
// 2. Renders it to an HTML string.
// 3. Injects that HTML into the client-built dist/index.html (#root).
// Result: crawlers receive fully-populated HTML; React hydrates on the client.
import { build } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distIndex = resolve(root, 'dist/index.html')
const ssrOutDir = resolve(root, '.ssr-tmp')

async function run() {
  // Build the server entry as an SSR bundle.
  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: '.ssr-tmp',
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
    },
  })

  const { render } = await import(pathToFileURL(resolve(ssrOutDir, 'entry-server.mjs')).href)
  const appHtml = render()

  let html = await readFile(distIndex, 'utf8')
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  await writeFile(distIndex, html, 'utf8')

  await rm(ssrOutDir, { recursive: true, force: true })
  console.log('✓ Pre-rendered static HTML injected into dist/index.html')
}

run().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
