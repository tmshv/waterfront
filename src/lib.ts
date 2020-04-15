import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    typographer: true,
    quotes: '«»‘’',
})

export function renderMarkdown(text: string) {
    return md.renderInline(text)
}
