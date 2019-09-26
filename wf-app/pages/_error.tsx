import * as React from 'react'
import { NextPage } from 'next'

import { withTranslation } from '../src/i18n'

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

//     if (res) {
//         ({ statusCode } = res)
//     } else if (err) {
//         ({ statusCode } = err)
//     }

    return {
        namespacesRequired: ['common'],
        statusCode: 0,
    }
}

export default withTranslation('common')(Page as any)
