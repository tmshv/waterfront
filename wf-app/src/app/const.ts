import { mdiFacebookBox, mdiYoutube, mdiVkBox, mdiInstagram } from '@mdi/js'
import { ISocialItem } from '../components/Social'
import { IMenuItem } from '../components/Menu'

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
        name: 'Events',
        url: '/events',
    },
    {
        name: 'Projects',
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
