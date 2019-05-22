import React from 'react'
import { getFeature } from '../src/api'

const Project = (props) => {
    return (
        <div>
            <pre>{JSON.stringify(props.feature, null, 4)}</pre>
        </div>
    )
}

Project.getInitialProps = async ({ query }) => {
    const slug = query.slug
    const data = await getFeature(slug)
    const feature = data.features[0]

    return {
        feature,
    }
}

export default Project