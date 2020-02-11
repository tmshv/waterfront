export interface IArticleProps {
    article: string,
}

export const Article: React.FC<IArticleProps> = props => (
    <article dangerouslySetInnerHTML={{
        __html: props.article
    }} />
)
