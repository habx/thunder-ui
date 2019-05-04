import styled from 'styled-components'

import borderRadius from '../borderRadius'
import fontSizes from '../fontSizes'
import theme from '../theme'

export const TextAreaContainer = styled.div`
  flex: 1 1 100%;
  position: relative;
`

export const StyledTextArea = styled.textarea`
  height: 100%;
  width: 100%;
  resize: vertical;
  padding: 8px;
  border-radius: ${borderRadius.narrow};
  min-height: 50px;
  font-size: ${fontSizes.small};

  border: 1px solid ${theme.get('primaryLighter', { dynamic: true })};
  color: ${theme.get('neutral', { dynamic: true })};
  background-color: transparent;

  &:disabled {
    background-color: transparent;
    opacity: 0.7;
  }
`
