import * as React from 'react'
import Link from 'next/link'
import { Article } from '../Article'

export const HeadArticleCard: React.FC<any> = props => (
    <Link
        href={props.item.url}
    >
        <a>
            <Article
                article={props.item}
                showContent={false}
                showCaption={true}
            />
        </a>
    </Link>
)
