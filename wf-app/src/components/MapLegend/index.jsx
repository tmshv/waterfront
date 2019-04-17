import React from 'react'
import PropTypes from 'prop-types'

function createStyle(item) {
    return {
        backgroundColor: item.color,
    }
}

export default class MapLegend extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.shape({
                type: PropTypes.string,
                color: PropTypes.string,
                name: PropTypes.string,
            }))
        }))
    }

    renderBlock(title, items, key) {
        return (
            <div
                key={key}
                className="wf-legend-block"
            >
                <header>{title}</header>

                <ul>
                    {items.map((x, i) => (
                        <li
                            key={i}
                            style={createStyle(x)}
                        >
                            <input className="checkbox" type="checkbox" />
                            {x.name}
                        </li>
                    ))}
                </ul>
            </div>
        )        
    }

    render() {
        return (
            <div className="wf-legend">
                {this.props.data.map(
                    (x, i) => this.renderBlock(x.title, x.items, i)
                )}
            </div>
        )
    }
}