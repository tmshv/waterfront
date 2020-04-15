export interface IApiResponse<T> {
    data: T
    public: boolean
}

export interface IEventDto {
    content_en?: string
    content_ru?: string
    created_by: number
    created_on: string,
    date: string,
    event_url: string,
    id: number,
    name_en?: string,
    name_ru?: string,
    preview_image: number,
    slug?: string,
    status: string,
    tags: string[]
}