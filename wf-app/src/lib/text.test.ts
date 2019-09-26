import { cleanText } from './text'

describe('lib text', () => {
    describe('cleanText', () => {
        it('should return empty string if null', () => {
            expect(cleanText(null)).toEqual('')
        })

        it('should remove all empty paragraphs', () => {
            const sample = cleanText(`
                <p></p>
                <p><br/></p>
                <p><br></p>
                <p>paragraph</p>
            `)
            expect(sample.indexOf('<p></p>')).toEqual(-1)
            expect(sample.indexOf('<p><br/></p>')).toEqual(-1)
            expect(sample.indexOf('<p><br></p>')).toEqual(-1)
        })
        
        it('should trim string', () => {
            const sample = cleanText(`
                <p>paragraph</p>
            `)

            expect(sample).toEqual(`<p>paragraph</p>`)
        })
    })
})
