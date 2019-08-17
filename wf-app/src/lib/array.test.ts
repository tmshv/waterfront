import { arrayToGrid, gridToColumns } from './array'

describe('lib array', () => {
    describe('arrayToGrid', () => {        
        it('should properly split in grid', () => {
            const sample = arrayToGrid(['a', 'b', 'c', 'd', 'e', 'f'], 3)

            expect(sample).toEqual([
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
            ])
        })
    })    
    
    describe('gridToColumns', () => {        
        it('should properly split in grid', () => {
            const sample = gridToColumns([
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
            ])
           
            expect(sample).toEqual([
                ['a', 'd'],
                ['b', 'e'],
                ['c', 'f'],
            ])
        })
        
        it('should return no nulls columns', () => {
            const sample = gridToColumns([
                ['a', 'b', 'c'],
                ['d', 'e',    ],
            ])
           
            expect(sample).toEqual([
                ['a', 'd'],
                ['b', 'e'],
                ['c',    ],
            ])
        })
    })    
})
