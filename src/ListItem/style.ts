import styled, { css } from 'styled-components'
import { getMainColor } from '../_internal/colors'

const prepareProps = props => ({
  hoverColor: props.hoverColor || getMainColor(props, { themeKey: 'neutralLight' })
})

export const ListItemContainer = styled.div.attrs(prepareProps)`
  padding: 16px;
  transition: background-color ease-in-out 200ms;
  display: flex;
  &[data-selected="true"] {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  ${({ clickable }) => clickable && css`
     &:hover {
      background-color: ${({ hoverColor }) => hoverColor};
      cursor: pointer;
    }
  `}}
`

export const RightElementContainer = styled.div`
  opacity: 0.7;
  padding: 0 16px;
  min-width: 15%;
  max-width: 300px;
  text-align: center;
  font-size: 12px;
`
