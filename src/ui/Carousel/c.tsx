export const NEXT = "NEXT";
export const PREV = "PREV";

const MARGIN = 0

export const Wrapper = props => (
    <div style={{
        overflow: 'hidden',
    }}
        className={'wrapper'}
    >
        {props.children}
    </div>
)

export const CarouselContainer: React.FC<any> = props => {
    const transition = props.sliding ? "none" : "transform 300ms ease"

    const transform = props => {
        if (!props.sliding) return `translateX(-100%)`;
        if (props.dir === PREV) return `translateX(-200%)`;

        return "translateX(0%)";
    }

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            transition,
            transform: transform(props),
        }}>
            {props.children}
        </div>
    )
}

export const CarouselSlot: React.FC<any> = props => {
    const order = props.order

    return (
        <div style={{
            flex: '1 0 100%',
            flexBasis: '100%',
            marginRight: MARGIN,
            order,
        }}>
            {props.children}
        </div>
    )
}
