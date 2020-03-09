import { NextPage } from 'next'
import { getFeature } from 'src/app/api'
import { Article } from 'src/components/Article'
import { featureToArticle } from 'src/app/factory'
import { withTranslation } from 'src/i18n'
import { IArticle } from 'src/app/types'
import { PageLayout } from 'src/components/PageLayout'
import { PageHead } from 'src/components/PageHead'
import * as Layout from 'src/components/Layout'
import { q } from 'src/lib/fetch'
import { getLang } from 'src/server/lib'

interface IProps {
    article: IArticle
}

const Page: NextPage<IProps> = props => {
    return (
        <Layout.Article>
            <PageLayout
                head={(
                    <PageHead
                        title={props.article.name}
                        caption={props.article.short}
                        image={props.article.previewImage}
                    />
                )}
            >
                <Article
                    article={props.article.body}
                />
            </PageLayout>
        </Layout.Article>
    )
}

Page.getInitialProps = async ctx => {
    const lang = getLang(ctx)
    const slug = q(ctx.query.slug)

    const feature = await getFeature(lang, slug)

    return {
        article: featureToArticle(feature)
    }
}

export default withTranslation('common')(Page as any)
