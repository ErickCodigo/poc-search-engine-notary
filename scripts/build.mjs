import {mkdir, readFile, writeFile} from 'fs/promises'
import {join} from 'path'
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeDocument from "rehype-document";

const mdxContent = await readFile('src/index.mdx', 'utf-8')

const now = new Date();
const datePart = now.toLocaleDateString('en-GB');
const timePart = now.toLocaleTimeString(['es-PE'], {hour: '2-digit', minute: '2-digit'});

const formattedDateTime = `${datePart} ${timePart}`;

// Unified trabaja con Abstract Syntax Tree (AST)
const file = await unified()
    .use(remarkParse) // Convierte a Markdown Abstract Syntax Tree (mAST)
    .use(remarkRehype) // Convierte a HTML Abstract Syntax Tree (hAST)
    .use(rehypeDocument, {language: 'es', title: `Actualizaste el ${formattedDateTime}`}) // Agrega head y body tags.
    .use(rehypeStringify) // Convierte de AST a HTML.
    .process(mdxContent)

await mkdir('docs', {recursive: true})
await writeFile(join('docs', 'index.html'), String(file), 'utf-8')

console.log('✅ index.html generado en /docs')
