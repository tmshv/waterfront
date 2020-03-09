import { NextPage } from 'next'
import { Article } from 'src/components/Article'
import { eventToArticle } from 'src/app/factory'
import { withTranslation } from 'src/i18n'
import { IArticle } from 'src/app/types'
import { getJson, q } from 'src/lib/fetch'
import { createApiUrl } from 'src/app/lib'
import { IEvent } from 'src/types'
import { PageLayout } from 'src/components/PageLayout'
import { PageHead } from 'src/components/PageHead'
import { getLang } from 'src/server/lib'

interface IProps {
    article: IArticle
}

const Page: NextPage<IProps> = props => {
    return (
        <PageLayout
            head={(
                <PageHead
                    title={props.article.name}
                    image={props.article.previewImage}
                />
            )}
        >
            <Article
                article={props.article.body}
            />
        </PageLayout >
    )
}

Page.getInitialProps = async ctx => {
    const lang = getLang(ctx)
    const slug = q(ctx.query.slug)
    const event = await getJson<IEvent>(
        createApiUrl(ctx.req, `/api/events/${slug}`),
        {
            lang,
        }
    )
    const article = eventToArticle(event)

    return {
        article,
        namespacesRequired: ['common'],
    }
}

export default withTranslation('common')(Page as any)
