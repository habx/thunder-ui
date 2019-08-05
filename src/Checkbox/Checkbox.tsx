import * as React from 'react'

import useTheme from '../useTheme'

import CheckboxProps from './Checkbox.interface'
import {
  Input,
  FakeInputContainer,
  FakeInput,
  FontIcon,
} from './Checkbox.style'

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  error,
  value,
  checked,
  disabled,
  id,
  ...props
}) => {
  const theme = useTheme()

  return (
    <FakeInputContainer>
      <Input
        {...props}
        data-error={error}
        data-background={theme.neutralLightest !== '#fff'}
        checked={!!value || !!checked}
        disabled={disabled}
        type="checkbox"
        id={id}
      />
      <FontIcon icon="check" />
      <FakeInput tabIndex={disabled ? undefined : 0} htmlFor={id} />
    </FakeInputContainer>
  )
}

export default Checkbox
