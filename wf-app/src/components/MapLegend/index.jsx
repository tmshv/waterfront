import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox'

import { SET_LAYER_VISIBLE } from '../../app/actions'

function createStyle(item) {
    return {
        backgroundColor: item.color,
    }
}

export default class MapLegend extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            type: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.shape({
                type: PropTypes.string,
                color: PropTypes.string,
                name: PropTypes.string,
                checked: PropTypes.bool,
            }))
        })),
        onChangeItemSelected: PropTypes.func,
    }

    onChange = (blockIndex, itemIndex, checked) => {
        this.props.onChangeItemSelected({
            type: SET_LAYER_VISIBLE,
            payload: {
                itemIndex,
                blockIndex,
                visible: checked,
            },
        })
    }

    renderBlock(type, title, items, blockIndex) {
        return (
            <div
                key={blockIndex}
                className="wf-legend-block"
            >
                <header>{title}</header>

                <ul>
                    {items.map((x, itemIndex) => (
                        <li
                            key={itemIndex}
                            style={createStyle(x)}
                        >
                            <Checkbox
                                label={x.name}
                                checked={x.checked}
                                onChange={
                                    event => this.onChange(blockIndex, itemIndex, event.target.checked)
                                }
                            />
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
                    (x, i) => this.renderBlock(x.type, x.title, x.items, i)
                )}
            </div>
        )
    }
}