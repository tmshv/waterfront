import React from 'react'
import PropTypes from 'prop-types'

const Logo = (props) => {
    return <img
        style={{
            width: props.width,
        }}
        src={'/static/waterfront.svg'}
    />
}

Logo.propTypes = {
    width: PropTypes.number,
}

Logo.defaultProps = {
    width: 100,
}

export default Logo