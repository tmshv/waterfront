import s from './button.module.css'

import cx from 'classnames'
import Link from 'next/link'
import { useOppositeLocale } from '@/hooks/useOppositeLocale'
import { useFlagCode } from '@/hooks/useFlagCode'

export interface ILangButtonProps {
    style?: React.CSSProperties
}

export const LangButton: React.FC<ILangButtonProps> = () => {
    const code = useFlagCode({
        fallback: 'ru',
    })
    const [href, locale] = useOppositeLocale()

    return (
        <Link href={href} locale={locale}>
            <a className={cx(s.button, 'flag-icon-background', `flag-icon-${code}`)} />
        </Link>
    )
}

export default LangButton
