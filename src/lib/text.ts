export function cleanText(text: string | null): string {
    if (!text) {
        return ''
    }
 
    return text
        .replace(new RegExp('<p><br/></p>', 'g'), '')
        .replace(new RegExp('<p><br></p>', 'g'), '')
        .replace(new RegExp('<p></p>', 'g'), '')
        .trim()
}
