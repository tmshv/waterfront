import s from './styles.module.css'

import Flag from 'react-world-flags'
import { useFlagCode } from 'src/hooks/useFlagCode'
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
            <a className={s.button}>
                <Flag
                    code={code}
                    height={18}
                />
            </a>
        </Link>
    )
}

export default LangButton
