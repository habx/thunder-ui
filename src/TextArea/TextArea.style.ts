import styled from 'styled-components'

import borderRadius from '../borderRadius'
import colors from '../colors'

const prepareProps = props => {
  const borderColor = props.borderColor || colors.platinium
  const errorColor = props.errorColor || colors.internationalOrange

  return {
    color: props.color || colors.paynesGrey,
    borderColor: props.error ? errorColor : borderColor
  }
}

export const TextAreaContainer = styled.div`
  flex: 1 1 100%;
  position: relative;
`

export const StyledTextArea = styled.textarea.attrs(prepareProps)`
  height: 100%;
  width: 100%;
  resize: vertical;
  padding: 8px;
  border-radius: ${borderRadius.narrow};
  min-height: 50px;

  border: 1px solid ${({ borderColor }) => borderColor};
  color: ${({ color }) => color};
`
