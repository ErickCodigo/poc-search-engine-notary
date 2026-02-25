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
const timePart = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

const formattedDateTime = `${datePart} ${timePart}`;

const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, {title: `Actualizaste el ${formattedDateTime}`})
    .use(rehypeStringify)
    .process(mdxContent)

await mkdir('docs', {recursive: true})
await writeFile(join('docs', 'index.html'), String(file), 'utf-8')

console.log('✅ index.html generado en /docs')
