import { PageContext } from "@/context/page"
import { useContext } from "react"
import Head from 'next/head'

export type OpengraphProps = {
    url: string
}

export const Opengraph: React.FC<OpengraphProps> = props => {
    const config = useContext(PageContext)
    if (!config.title) {
        return null
    }

    const baseUrl = 'https://waterfront.tools'
    const url = `${baseUrl}${props.url}`
    const image = `${baseUrl}${config.cover}`

    return (
        <Head>
            {/* Search Engine */}
            <meta name="description" content={config.excerpt} />
            <meta name="image" content={image} />

            {/* Schema.org for Google */}
            <meta itemProp="name" content={config.title} />
            <meta itemProp="description" content={config.excerpt} />
            <meta itemProp="image" content={image} />

            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta property="og:title" content={config.title} />
            <meta property="og:description" content={config.excerpt} />
            <meta property="og:image" content={image} />
            {/* <meta property="og:image:width" content={config.imageWidth.toString()} /> */}
            {/* <meta property="og:image:height" content={config.imageHeight.toString()} /> */}
            <meta property="og:url" content={url} />
            {/* <meta property="og:site_name" content={config.siteName} /> */}
            {/* <meta property="og:locale" content={config.locale} /> */}
            {/* <meta property="og:type" content={config.type} /> */}
        </Head>
    )
}
