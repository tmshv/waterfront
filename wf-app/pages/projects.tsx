import { NextPage } from 'next'
import { getFeatures } from 'src/app/api'
import { featureToArticle } from 'src/app/factory'
import { AppPointFeature } from 'src/app/types'
import { withTranslation, useTranslation } from 'src/i18n'
import { PageLayout } from 'src/components/PageLayout'
import { PageHead } from 'src/components/PageHead'
import { useColumns } from 'src/hooks/useColumns'
import { getLang } from 'src/server/lib'

interface IProps {
    features: AppPointFeature[]
}

export const Page: NextPage<IProps> = props => {
    const articleCards = props.features.map(featureToArticle)
    const { t } = useTranslation()
    const columns = useColumns()

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

Page.getInitialProps = async ctx => {
    const lang = getLang(ctx)
    const city = 'saint_petersburg'
    const data = await getFeatures(lang!, city, true)

    return {
        features: data,
    }
}

export default withTranslation('common')(Page as any)
