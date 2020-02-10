import { NextPage } from 'next'
import { getFeatures } from 'src/app/api'
import { featureToArticle } from 'src/app/factory'
import { AppPointFeature } from 'src/app/types'
import { i18n, useTranslation } from 'src/i18n'
import { PageLayout } from 'src/components/PageLayout'
import { useMobile } from 'src/hooks/useMobile'
import { PageHead } from 'src/components/PageHead'

interface IProps {
    features: AppPointFeature[]
}

export const Page: NextPage<IProps> = props => {
    const articleCards = props.features.map(featureToArticle)
    const isMobile = useMobile()
    const { t } = useTranslation()
    const columns = isMobile ? 1 : 3

    return (
        <PageLayout
            wideBody={true}
            head={(
                <PageHead
                    title={t('Projects')}
                    // caption={t('Проекты команд')}
                    image={51}
                />
            )}
        >
            {/* <CardList
                style={{
                    padding: '0 10px',
                }}
                columns={columns}
                items={articleCards}
                highlightFirst={true}
                renderFirstItem={article => (
                    <HeadArticleCard
                        item={article}
                    />
                )}
                renderItem={article => (
                    <ArticleCard
                        key={article.slug}
                        article={article}
                        style={{
                            marginBottom: '2em',
                        }}
                    />
                )}
            /> */}
        </PageLayout >
    )
}

Page.getInitialProps = async ({ req }) => {
    let lang: string | null = null
    if (req) {
        lang = (req as any).i18n.language
    } else {
        lang = i18n.language
    }

    const city = 'saint_petersburg'
    const data = await getFeatures(lang!, city, true)

    return {
        features: data,
    }
}

export default Page