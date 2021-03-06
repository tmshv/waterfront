import { useContext } from 'react'
import { PageContext } from '@/context/page'
import { PageHead } from '@/components/PageHead'
import { Person, PersonProps } from '@/components/Person'
import { WideBlock } from '@/components/WideBlock'
import { Video } from '@/components/Video'
import { Carousel } from '@/ui/Carousel'
import { Columns } from '@/ui/Columns'
import { Grid } from '@/ui/Grid'
import { Card } from '@/ui/Card'
import { Menu } from '@/ui/Menu'
import { A } from '@/components/A'
import Image from 'next/image'

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

const Img: React.FC<{ src: string }> = props => {
    const config = useContext(PageContext)

    return (
        <Image
            src={props.src}
            alt={config.excerpt}
            width={4}
            height={3}
            layout={'responsive'}
            objectFit={'cover'}
        />
    )
}

export const components = {
    h1: H1,
    a: A,
    img: Img,
    Person: (props: PersonProps) => (
        <Person {...props}
            style={{
                marginBottom: 50,
            }}
        />
    ),
    Carousel: (props: any) => (
        <Carousel {...props}
            style={{
                marginBottom: 50,
            }}
        />
    ),
    Video,
    Columns,
    Grid,
    Card,
    Menu,
}
