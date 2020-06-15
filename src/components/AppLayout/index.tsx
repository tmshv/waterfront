import { useMobile } from 'src/hooks/useMobile'
import { PageLayout } from '../PageLayout'
import * as Layout from 'src/components/Layout'

interface IAppLayoutProps {
    side: React.ReactNode
}

export const AppLayout: React.FC<IAppLayoutProps> = props => {
    const isMobile = useMobile()

    return (
        <Layout.Map>
            <PageLayout
                wideBody={true}
                extraSidebar={isMobile ? props.side : null}
            >
                <div>
                    <style jsx>{`
                        div {
                            position: relative;

                            width: 100%;
                            height: 100%;
                        }
                        
                        section {
                            position: absolute;
                            top: 0;
                            left: 0;
                            max-width: 300px;
                            min-width: 270px;
                            width: 30%;

                            padding: 10px;
                        }
                    `}</style>

                    {props.children}

                    {isMobile ? null : (
                        <section>
                            {props.side}
                        </section>
                    )}
                </div>
            </PageLayout>
        </Layout.Map>
    )
}
