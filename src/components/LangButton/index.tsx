import s from './button.module.css'

import { useFlagCode } from 'src/hooks/useFlagCode'
import cx from 'classnames'
import Link from 'next/link'
import { useOppositeLocale } from '@/hooks/useOppositeLocale'

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
