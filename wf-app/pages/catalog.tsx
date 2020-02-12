import { NextPage } from 'next'
import { getFeatures } from 'src/app/api'
import { featureToArticle } from 'src/app/factory'
import { CardList } from 'src/components/CardList'
import { AppPointFeature } from 'src/app/types'
import { i18n } from 'src/i18n'
import { PageLayout } from 'src/components/PageLayout'
import { useColumns } from 'src/hooks/useColumns'
import * as Layout from 'src/components/Layout'
import { Card } from 'src/components/Card'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import { useTranslation } from 'src/i18n'

interface IProps {
    features: AppPointFeature[]
}

export const Page: NextPage<IProps> = props => {
    const { t } = useTranslation()
    const items = props.features.map(featureToArticle)
    const columns = useColumns()
    const head = items[0]

    return (
        <Layout.Cards>
            <PageLayout
                wideBody={true}
                head={(
                    <PageHead
                        title={t('Catalog')}
                        caption={head.short}
                        image={head.previewImage}
                    />
                )}
            >
                <CardList
                    style={{
                        marginTop: 'var(--size-l)',
                        padding: '0 var(--size-l)',
                    }}
                    columns={columns}
                    items={items}
                    renderItem={(article, style) => {
                        const year = article.date?.getFullYear()
                        const tags = year ? [`${year}`] : []

                        return (
                            <Card
                                style={style}
                                key={article.slug}
                                title={article.name}
                                tags={tags}
                                previewImage={article.previewImage}
                                href={article.url}
                            >
                                <Short
                                    text={article.short}
                                />
                            </Card>
                        )
                    }}
                />
            </PageLayout>
        </Layout.Cards>
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