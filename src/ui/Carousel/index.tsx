import s from './carousel.module.css'

import React, { useReducer } from "react"
import { useSwipeable } from "react-swipeable"
import { Wrapper, CarouselContainer, CarouselSlot, PREV, NEXT } from "./c"
import { Button } from "@/ui/Button"

const getOrder = ({ index, pos, numItems }) => {
    return index - pos < 0
        ? numItems - Math.abs(index - pos)
        : index - pos
}
const initialState = { pos: 0, sliding: false, dir: NEXT }

export type CarouselProps = {
    style?: React.CSSProperties
}

export const Carousel: React.FC<CarouselProps> = props => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const numItems = React.Children.count(props.children)

    const slide = (dir) => {
        dispatch({ type: dir, numItems })

        setTimeout(() => {
            dispatch({ type: "stopSliding" })
        }, 100)
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => slide(NEXT),
        onSwipedRight: () => slide(PREV),
        // preventDefaultTouchmoveEvent: true,
        trackMouse: true
    })

    return (
        <div {...handlers} style={props.style}>
            <Wrapper>
                <CarouselContainer dir={state.dir} sliding={state.sliding}>
                    {React.Children.map(props.children, (child, index) => (
                        <CarouselSlot
                            key={index}
                            order={getOrder({ index: index, pos: state.pos, numItems })}
                        >
                            {child}
                        </CarouselSlot>
                    ))}
                </CarouselContainer>
            </Wrapper>
            <div className={s.controls}>
                <Button onClick={() => slide(PREV)}>
                    Prev
                </Button>
                <Button onClick={() => slide(NEXT)}>
                    Next
                </Button>
            </div>
        </div>
    );
}

type State = {
    type: string,
    numItems?: number
}

function reducer(state, { type, numItems = 0 }: State) {
    switch (type) {
        case "reset":
            return initialState;
        case PREV:
            return {
                ...state,
                dir: PREV,
                sliding: true,
                pos: state.pos === 0 ? numItems - 1 : state.pos - 1
            };
        case NEXT:
            return {
                ...state,
                dir: NEXT,
                sliding: true,
                pos: state.pos === numItems - 1 ? 0 : state.pos + 1
            };
        case "stopSliding":
            return { ...state, sliding: false };
        default:
            return state;
    }
}
