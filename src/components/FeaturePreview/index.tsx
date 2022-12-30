import Link from 'next/link'
import Image from 'next/legacy/image'
import { renderMarkdown } from '@/lib'
import { memo } from 'react'

export interface IFeaturePreviewProps {
    href: string
    title: string
    body: string
    year: number
    previewImageSrc: string
}

export const FeaturePreview: React.FC<IFeaturePreviewProps> = memo(props => {
    return (
        <Link href={props.href}>
            <style jsx>{`
                    a {
                        display: block;

                        color: black;
                        text-decoration: none;
                    }

                    a:visited {
                        color: black;
                    }

                    h3 {
                        font-size: 1em;
                        line-height: 1.5em;
                        margin: 0;
                    }

                    .wf-popup-content p {
                        padding: 0;
                        margin: 0;
                    }

                    .wf-popup-content {
                        padding: 10px;
                    }
            `}</style>

            <div className={'wf-popup-content'}>
                {!props.year ? null : (
                    <p className={'date'}>
                        {props.year}
                    </p>
                )}
                <h3>
                    {renderMarkdown(props.title)}
                </h3>
                {!props.body ? null : (
                    <p>
                        {renderMarkdown(props.body)}
                    </p>
                )}
            </div>

            <Image
                src={props.previewImageSrc}
                width={1}
                height={1}
                layout={'responsive'}
                objectFit={'cover'}
            />
        </Link>
    )
})