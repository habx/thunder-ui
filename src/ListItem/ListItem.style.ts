import styled, { css } from 'styled-components'

import theme from '../theme'

export const ListItemContainer = styled.li`
  padding: 16px;
  transition: background-color ease-in-out 200ms;
  display: flex;
  outline: none;

  &[data-selected='true'] {
    background-color: ${theme.get('neutralLight', { propName: 'hoverColor' })};
  }

  &[data-clickable='true'] {
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: ${theme.get('neutralLight', {
        propName: 'hoverColor',
      })};
    }
  }
`

export const RightElementContainer = styled.div`
  opacity: 0.7;
  padding: 0 16px;
  min-width: 15%;
  max-width: 300px;
  text-align: center;
  font-size: 12px;
`
