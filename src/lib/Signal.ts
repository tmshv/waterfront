export type Listener<P> = (payload: P) => void

export interface ISignal<P> {
    on(callback: Listener<P>): this
    off(callback: Listener<P>): this
    trigger(payload: P): this
}

export default class Signal<P> implements ISignal<P> {
    private listeners: Listener<P>[]

    constructor() {
        this.listeners = []
    }

    on(callback: Listener<P>) {
        this.listeners.push(callback)

        return this
    }

    off(callback: Listener<P>) {
        this.listeners = this.listeners.filter(x => x !== callback)

        return this
    }

    trigger(payload: P) {
        this.listeners.forEach(fn => {
            fn(payload)
        })
        return this
    }

    listenersCount() {
        return this.listeners.length
    }
}

export class BufferableSignal<P> implements ISignal<P>{
    private buffer: P[]
    private s: Signal<P>

    constructor() {
        this.buffer = []
        this.s = new Signal()
    }

    on(callback: Listener<P>) {
        this.s.on(callback)

        if (this.buffer.length > 0) {
            this.flush()
        }

        return this
    }

    off(callback: Listener<P>) {
        this.s.off(callback)

        return this
    }

    trigger(payload: P) {
        if (this.hasListeners()) {
            this.s.trigger(payload)
        } else {
            this.buffer.push(payload)
        }

        return this
    }

    private flush() {
        for (const p of this.buffer) {
            this.s.trigger(p)
        }

        this.buffer = []
    }

    private hasListeners() {
        return this.s.listenersCount() > 0
    }
}
