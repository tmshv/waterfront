import { mdiFacebookBox, mdiYoutube, mdiVkBox, mdiInstagram } from '@mdi/js'
import { ISocialItem } from '../components/Social'
import { IMenuItem } from '../components/Menu'
import { IRect } from 'src/lib/types'

export const defaultLayout = {
    screen: false,
    mainMarginTop: true,
    mainMarginBottom: true,
    showFooter: true,
    backgroundColor: 'var(--backgound-color)',
}

export const previewImageSize: IRect = {
    w: 500,
    h: 500,
}

export const imageSize: IRect = {
    w: 1500,
    h: 1500,
}

export const social: ISocialItem[] = [
    {
        icon: mdiInstagram,
        url: 'https://www.instagram.com/waterfront.tools',
    },
    {
        icon: mdiYoutube,
        url: 'https://www.youtube.com/channel/UCuGZYvNOfbfIzZTlKZKYzqw',
    },
    {
        icon: mdiFacebookBox,
        url: 'https://www.facebook.com/waterfront.tools',
    },
    {
        icon: mdiVkBox,
        url: 'https://vk.com/waterfront2019',
    },
]

export const menu: IMenuItem[] = [
    {
        name: 'Map',
        url: '/',
    },
    {
        name: 'About',
        url: '/about',
    },
    {
        name: 'Projects',
        url: '/projects',
    },
    {
        name: 'Events',
        url: '/events',
    },
    {
        name: 'Catalog',
        url: '/catalog',
    }
]

export const contacts = [
    {
        tel: '+79500237093',
        email: 'coordinator@waterfront.tools',
        title: 'Полина Климовицкая, координатор проекта',
    },
    {
        tel: '+79817640984',
        email: 'media@waterfront.tools',
        title: 'Вика Григоренко, пресс-секретарь',
    }
]
