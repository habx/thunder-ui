import styled from 'styled-components'

import borderRadius from '../borderRadius'
import fontSizes from '../fontSizes'
import { getMainColor } from '../_internal/colors'

const prepareProps = props => ({
  color: getMainColor(props, { themeKey: 'neutral' }),
  borderColor: getMainColor(props, { themeKey: 'neutralLight'})
})

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
  font-size: ${fontSizes.small};

  border: 1px solid ${({ borderColor }) => borderColor};
  color: ${({ color }) => color};

  background-color: transparent;

  &:disabled {
    background-color: transparent;
    opacity: 0.7;
  }
`
