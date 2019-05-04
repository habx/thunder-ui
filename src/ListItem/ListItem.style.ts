import styled, { css } from 'styled-components'

import theme from '../theme'

export const ListItemContainer = styled.li`
  padding: 16px;
  transition: background-color ease-in-out 200ms;
  display: flex;

  &[data-selected="true"] {
    background-color: ${theme.get('neutralLight',{ propName: 'hoverColor' })};
  }

  ${({ clickable }) => clickable && css`
     &:hover {
      background-color: ${theme.get('neutralLight',{ propName: 'hoverColor' })};
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
