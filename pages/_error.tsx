import * as React from 'react'
import { NextPage } from 'next'

interface IProps {
    namespacesRequired: string[]
    statusCode: number
}

const Page: NextPage<IProps> = props => (
    <p>
        {props.statusCode}
        {/* {props.statusCode
            ? t('error-with-status', { statusCode })
            : t('error-without-status')} */}
    </p>
)

Page.getInitialProps = async ({ res, err }) => {
    // let statusCode = null

    const statusCode = res?.statusCode ?? err?.statusCode ?? 404
//     if (res) {
//         ({ statusCode } = res)
//     } else if (err) {
//         ({ statusCode } = err)
//     }

    return {
        namespacesRequired: ['common'],
        statusCode,
    }
}

export default Page
