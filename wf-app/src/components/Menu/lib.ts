import { mdiFacebookBox, mdiYoutube, mdiVkBox, mdiInstagram } from '@mdi/js'
import { IMenuItem } from '.'

export function createDefaultMenuItems(): IMenuItem[] {
    return [
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
            icon: mdiInstagram,
            url: 'https://www.instagram.com/waterfront.tools',
            newTab: true,
            marginRight: 10,
        },
        {
            icon: mdiYoutube,
            url: 'https://www.youtube.com/playlist?list=PL04bG7e-zbhB_pGj9UGQIgM8G34xo3hqj',
            newTab: true,
            marginRight: 10,
        },
        {
            icon: mdiFacebookBox,
            url: 'https://www.facebook.com/waterfront.tools',
            newTab: true,
            marginRight: 10,
        },
        {
            icon: mdiVkBox,
            url: 'https://vk.com/waterfront2019',
            newTab: true,
            marginRight: 10,
        },
    ]
}