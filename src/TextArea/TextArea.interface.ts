import * as React from 'react'

import { Input } from '../_internal/types'

type Base = React.HTMLAttributes<HTMLTextAreaElement>

export default interface TextAreaProps
  extends Input<string | number>,
    Pick<Base, Exclude<keyof Base, 'value' | 'onChange'>> {
  small?: boolean
}
