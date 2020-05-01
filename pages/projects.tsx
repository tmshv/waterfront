import { NextPage } from 'next'
import { featureToArticle } from 'src/app/factory'
import { AppPointFeature } from 'src/app/types'
import { useTranslation } from 'src/hooks/useTranslation'
import { PageLayout } from 'src/components/PageLayout'
import { PageHead } from 'src/components/PageHead'
import { useColumns } from 'src/hooks/useColumns'

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
    return {
        features: [],
    }
}

export default Page
