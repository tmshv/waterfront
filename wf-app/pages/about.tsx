import * as React from 'react'

import { NextPage } from 'next'

import { getAbout, getPersons } from '../src/api'
import { Menu } from '../src/components/Menu'
import Footer from '../src/components/Footer'
import { DefaultLayout } from '../src/components/DefaultLayout'
import { Article } from '../src/components/Article'
import { withTranslation, i18n, useTranslation } from '../src/i18n'
import { IArticle } from '../src/app/types'

const Partner: React.FC<{ item: any }> = props => (
    <div className={'partner'}>
        <style jsx>{`
            .partner {
                display: flex;

                margin-bottom: 70px;
            }

            .preview {
                flex: 1;
            }

            .content {
                flex: 3;
            }

            .image {
                width: 150px;
            }

            img {
                display: block;
                width: 100%;
            }
        `}</style>

        <div className={'preview'}>
            <div className={'image'}>
                <img
                    src={props.item.previewImage}
                />
            </div>
        </div>

        <div className={'content'}>
            <strong>{props.item.name}</strong>

            <div
                dangerouslySetInnerHTML={{ __html: props.item.content }}
            />
        </div>
    </div>
)

interface IProps {
    article: IArticle
    team: any[]
    experts: any[]
    partners: any[]
}

const Page: NextPage<IProps> = props => {
    const { t } = useTranslation()

    return (
        <DefaultLayout
            header={(
                <Menu />
            )}
            main={(
                <Article
                    article={props.article}
                    after={(
                        <>
                            <h2>{t('Team')}</h2>
                            {props.team.map((x, i) => (
                                <Partner
                                    key={i}
                                    item={x}
                                />
                            ))}

                            <h2>{t('Experts')}</h2>
                            {props.partners.map((x, i) => (
                                <Partner
                                    key={i}
                                    item={x}
                                />
                            ))}

                            <h2>{t('Partners')}</h2>
                            {props.partners.map((x, i) => (
                                <Partner
                                    key={i}
                                    item={x}
                                />
                            ))}
                        </>
                    )}
                />
            )}
            footer={(
                <Footer />
            )}
        />
    )
}

Page.getInitialProps = async ({ req }) => {
    let lang: string | null = null
    if (req) {
        lang = (req as any).i18n.language
    } else {
        lang = i18n.language
    }

    const article = await getAbout(lang!)
    const persons = await getPersons(lang!)

    const team = persons.filter(x => x.role === 'team')
    const experts = persons.filter(x => x.role === 'expert')
    const partners = persons.filter(x => x.role === 'partner')

    return {
        article,
        team,
        experts,
        partners,
        namespacesRequired: ['common'],
    }
}

export default withTranslation('common')(Page as any)
