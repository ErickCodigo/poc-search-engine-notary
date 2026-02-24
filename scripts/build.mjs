import { compile } from '@mdx-js/mdx'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const mdxContent = await readFile('src/index.mdx', 'utf-8')

const compiled = await compile(mdxContent, {
    outputFormat: 'function-body'
})

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi página</title>
  </head>
  <body>
    <div id="root">
      <!-- Contenido generado desde MDX -->
      <p>Archivo generado automáticamente.</p>
    </div>
    <script type="module">
      ${compiled.value}
    </script>
  </body>
</html>`

await mkdir('docs', { recursive: true })
await writeFile(join('docs', 'index.html'), html, 'utf-8')

console.log('✅ index.html generado en /docs')
