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
                <style jsx>{`
                    header {
                        font-size: 1.2em;
                        color: black;

                        padding: 2px 5px;
                        margin-bottom: 5px;
                    }

                    .wf-legend-block{
                        margin-bottom: 15px;
                    }

                    .wf-legend-block ul {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                    }

                    .wf-legend-block li {
                        padding: 2px 5px;
                    }
                `}</style>

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
            <div>
                <style jsx>{`
                    div {
                        color: white;
                        padding: 15px;
                    }
                `}</style>

                {this.props.data.map(
                    (x, i) => this.renderBlock(x.type, x.title, x.items, i)
                )}
            </div>
        )
    }
}