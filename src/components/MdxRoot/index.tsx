import { useContext, useEffect } from 'react'
import { PageContext } from '@/context/page'
import { PageHead } from '@/components/PageHead'
import { Person } from '@/components/Person'
import { WideBlock } from '@/components/WideBlock'
import { Video } from '@/components/Video'
import { A } from '@/components/A'

const H1: React.FC<{ children: string }> = props => {
    const config = useContext(PageContext)

    return (
        <WideBlock style={{
            marginBottom: 'var(--size-xxl)'
        }}>
            <PageHead
                title={props.children}
                caption={config.excerpt}
                image={config.cover}
            />
        </WideBlock>
    )
}

type PersonData = {
    shape?: string
    name: string
    image: string
    children: React.ReactNode
}

export const components = {
    wrapper: props => (
        <article>
            <main {...props} />
        </article>
    ),
    h1: H1,
    a: A,
    Person: (props: PersonData) => (
        <Person
            shape={props.shape ?? 'default'}
            item={{
                name: props.name,
                content: '',
                previewImage: props.image,
                role: 'team',
            }}
            style={{
                marginBottom: 50,
            }}
        >
            {props.children}
        </Person>
    ),
    Video,
}
