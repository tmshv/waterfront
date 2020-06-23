import { mdiFacebookBox, mdiYoutube, mdiVkBox, mdiInstagram } from '@mdi/js'
import { ISocialItem } from '../components/Social'
import { IMenuItem } from 'src/context/menu'
import { IRect } from 'src/lib/types'
import { ICity } from '@/types'

export const defaultLayout = {
    screen: false,
    mainMarginTop: true,
    mainMarginBottom: true,
    showFooter: true,
    backgroundColor: 'var(--color-back)',
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
        tel: '+79213951389',
        email: 'pr@waterfront.tools',
        title: 'Анастасия Пронина, пресс-секретарь',
    },
    {
        tel: '+79817640984',
        email: 'media@waterfront.tools',
        title: 'Вика Григоренко, редактор сайта',
    }
]

export const cities = new Map<string, ICity>([
    ['saint_petersburg', {
        key: 'saint_petersburg',
        title: 'Saint Petersburg',
        viewport: {
            latitude: 59.932924,
            longitude: 30.344087,
            zoom: 11,
        }
    }],
    ['stockholm', {
        key: 'stockholm',
        title: 'Stockholm',
        viewport: {
            latitude: 59.32477835068242,
            longitude: 18.071174590117273,
            zoom: 12,
        }
    }],
    ['oslo', {
        key: 'oslo',
        title: 'Oslo',
        viewport: {
            latitude: 59.912112881280706,
            longitude: 10.741096809260386,
            zoom: 12,
        }
    }]
])
