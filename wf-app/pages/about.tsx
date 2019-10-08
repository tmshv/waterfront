import * as React from 'react'

import { NextPage } from 'next'

import { getAbout, getPersons } from '../src/app/api'
import { Article } from '../src/components/Article'
import { withTranslation, i18n, useTranslation } from '../src/i18n'
import { IArticle, IPerson } from '../src/app/types'
import { PersonsBlock } from '../src/components/PersonsBlock'
import { PageLayout } from '../src/components/PageLayout'

interface IProps {
    article: IArticle
    team: IPerson[]
    experts: IPerson[]
    partners: IPerson[]
}

const Page: NextPage<IProps> = props => {
    return (
        <PageLayout
            head={{
                title: props.article.name,
                caption: props.article.short,
                image: props.article.previewImage,
            }}
        >
            <Article
                article={props.article}
            />

            <PersonsBlock
                title={'Team'}
                items={props.team}
            />

            <PersonsBlock
                title={'Experts'}
                items={props.team}
            />

            <PersonsBlock
                title={'Partners'}
                items={props.team}
            />
        </PageLayout>
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
