import { PageSignalContext, PageContext, pageSignal, PageConfigProps, defaultPageConfig } from 'src/context/page'
import { useState, useEffect } from 'react'

export const PageConfig: React.FC = props => {
    const [data, setData] = useState<PageConfigProps>(defaultPageConfig)

    useEffect(() => {
        const f = (props: object) => {
            setData(x => ({
                ...x,
                ...props,
            }))
        }

        pageSignal.on(f)

        return () => {
            pageSignal.off(f)
        }
    }, [])

    return (
        <PageSignalContext.Provider value={pageSignal}>
            <PageContext.Provider value={data}>
                {props.children}
            </PageContext.Provider>
        </PageSignalContext.Provider>
    )
}