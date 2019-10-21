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
]
