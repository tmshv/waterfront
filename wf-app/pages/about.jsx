import React, { useReducer } from 'react'
import { getAbout, getPersons } from '../src/api'
import { aboutToArticle } from '../src/app/factory'
import Menu from '../src/components/Menu'
import Footer from '../src/components/Footer'
import DefaultLayout from '../src/components/DefaultLayout'
import Article from '../src/components/Article'

const Partner = (props) => (
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

const About = (props) => (
    <DefaultLayout
        headerOverlay={true}
        header={(
            <Menu />
        )}
        main={(
            <Article
                article={props.article}
                after={(
                    <>
                        <h2>Team</h2>
                        {props.team.map((x, i) => (
                            <Partner
                                key={i}
                                item={x}
                            />
                        ))}

                        <h2>Partners</h2>
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

About.getInitialProps = async () => {
    const about = await getAbout()
    const persons = await getPersons()

    const team = persons.filter(x => x.role === 'team')
    const experts = persons.filter(x => x.role === 'expert')
    const partners = persons.filter(x => x.role === 'partner')

    return {
        article: aboutToArticle(about),
        team,
        experts,
        partners,
    }
}

export default About