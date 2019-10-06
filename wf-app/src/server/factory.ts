import { IEventDto } from './types'
import { IEvent } from '../types'
import { cleanText } from '../lib/text'
import { resolveLangField, getLangPriorityOrder } from './lib'

export function createEvent(x: IEventDto, lang: string): IEvent {
    const imageId = x.preview_image

    return {
        id: x.id,
        slug: x.slug!,
        eventUrl: x.event_url,
        href: `/event/${x.slug}`,
        content: cleanText(
            resolveLangField(x, 'content', getLangPriorityOrder(lang))
        ),
        name: resolveLangField(x, 'name', getLangPriorityOrder(lang)),
        imageId,
        date: parseDate(x.date)
    }
}

function parseDate(value: string): Date {
    return new Date(
        Date.parse(value)
    )
}
