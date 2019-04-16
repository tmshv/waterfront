import React from 'react'

const placementType = [
    {
        style: {
            backgroundColor: '#871811',
        },
        name: 'конструкции на воде',
    },
    {
        style: {
            backgroundColor: '#5e3c23',
        },
        name: 'намыв',
    },
    {
        style: {
            backgroundColor: '#59070c',
        },
        name: 'на воде',
    },
    {
        style: {
            backgroundColor: '#272d63',
        },
        name: 'на берегу',
    },
    {
        style: {
            backgroundColor: '#016661',
        },
        name: 'прибрежные комплексы',
    },
]

const actorType = [
    {
        style: { backgroundColor: '#996767' },
        name: 'Complex',
    },
    {
        style: { backgroundColor: '#eb6568' },
        name: 'Scientists',
    },
    {
        style: { backgroundColor: '#f19698' },
        name: 'Artists',
    },
    {
        style: { backgroundColor: '#facb99' },
        name: 'Developers',
    },
    {
        style: { backgroundColor: '#cde3c2' },
        name: 'Authorities',
    },
    {
        style: { backgroundColor: '#edcce3' },
        name: 'Designers',
    },
    {
        style: { backgroundColor: '#9898cb' },
        name: 'Activists',
    },
]

const projectType = [
    {
        style: {
            backgroundColor: '#009fdb',
        },
        name: 'Art Intervention',
    },
    {
        style: {
            backgroundColor: '#2f46d1',
        },
        name: 'Urban Intervention',
    },
    {
        style: {
            backgroundColor: '#9f1f80',
        },
        name: 'Installation',
    },
    {
        style: {
            backgroundColor: '#e44892',
        },
        name: 'Public Research',
    },
    {
        style: {
            backgroundColor: '#e21d2f',
        },
        name: 'Private Research',
    },
    {
        style: {
            backgroundColor: '#ec7c23',
        },
        name: 'Academic Research',
    },
    {
        style: {
            backgroundColor: '#ffe800',
        },
        name: 'Private Project',
    },
    {
        style: {
            backgroundColor: '#99bc36',
        },
        name: 'Public Project',
    },
    {
        style: {
            backgroundColor: '#009447',
        },
        name: 'Academic Project',
    },
]

export default class MapLegend extends React.Component {
    renderBlock(title, items) {
        return (
            <div className="wf-legend-block">
                <header>{title}</header>

                <ul>
                    {items.map(x => (
                        <li style={x.style}>
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
                {this.renderBlock('Расположение', placementType)}
                {this.renderBlock('Тип акторов', actorType)}
                {this.renderBlock('Тип проекта', projectType)}
            </div>
        )
    }
}