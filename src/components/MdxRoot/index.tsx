import { MDXProvider } from '@mdx-js/react'
import { useContext, useEffect } from 'react'
import { PageSignalContext, PageContext } from '@/context/page'
import { PageHead } from '@/components/PageHead'
import { Person } from '@/components/Person'
import { WideBlock } from '@/components/WideBlock'
import { Video } from '@/components/Video'
import { A } from '@/components/A'

// const H1 = props => <h1 style={{ color: 'tomato' }} {...props} />
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

const components = {
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
    Demo: props => (
        <h1>This is a component</h1>
    ),
    Meta: props => {
        const signal = useContext(PageSignalContext)

        useEffect(() => {
            signal.trigger(props)
        }, [props])

        return null
    }
}

export type MdxRootProps = {

}

export const MdxRoot: React.FC<MdxRootProps> = props => {
    return (
        <MDXProvider components={components}>
            {props.children}
        </MDXProvider>
    )
}