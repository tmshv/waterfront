import * as React from 'react'
import Link from 'next/link'
import { renderMarkdown } from '../../lib'

export interface IFeaturePreviewProps {
    href: string
    title: string
    body: string
    year: number
    previewImageSrc: string
}

export const FeaturePreview: React.FC<IFeaturePreviewProps> = React.memo(props => {
    return (
        <Link href={props.href}>
            <a>
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

                    .preview-image img{
                        display: block;
                        width: 100%;
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

                <div className="preview-image">
                    <img src={props.previewImageSrc} />
                </div>
            </a>
        </Link>
    )
})