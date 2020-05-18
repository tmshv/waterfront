import { includes } from './set'

describe('set::includes', () => {
    it('should return true if superset includes all subset items', () => {
        expect(includes(new Set(['a', 'b', 'c', 'd', 'e', 'f']), new Set(['a', 'd', 'f']))).toBeTruthy()
    })

    it('should return false if at least one of subset items doesnt exist in superset', () => {
        expect(includes(new Set(['a', 'b', 'c', 'd', 'e', 'f']), new Set(['a', 'd', '!']))).toBeFalsy()
    })

    it('should return true if superset and subset contains one equal item', () => {
        expect(includes(new Set(['a']), new Set(['a']))).toBeTruthy()
    })
})
