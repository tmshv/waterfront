import s from './styles.module.css'

import { useFlagCode } from 'src/hooks/useFlagCode'
import cx from 'classnames'
import Link from 'next/link'
import { useOtherLangHref } from 'src/hooks/useOtherLangHref'

export interface ILangButtonProps {
    style?: React.CSSProperties
}

export const LangButton: React.FC<ILangButtonProps> = props => {
    const code = useFlagCode({
        fallback: 'ru',
    })
    const otherLink = useOtherLangHref()

    return (
        <Link href={otherLink}>
            <a className={cx(s.button, 'flag-icon-background', `flag-icon-${code}`)} />
        </Link>
    )
}

export default LangButton
