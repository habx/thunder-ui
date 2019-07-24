import styled, { css } from 'styled-components'

import borderRadius from '../borderRadius'
import theme from '../theme'

export const CardContainer = styled.div<{
  noPadding?: boolean
  interactive?: boolean
  error?: boolean
  warning?: boolean
}>`
  box-shadow: ${theme.get('shadow')};
  border-radius: ${borderRadius.narrow};
  background-color: ${theme.get('neutralLightest', {
    propName: 'backgroundColor',
  })};
  padding: ${({ noPadding }) => (noPadding ? '0' : '32px')};

  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;
      transition: box-shadow 150ms ease-in-out;

      &:hover {
        box-shadow: ${theme.get('shadowStrong')};
      }

      &:active {
        box-shadow: ${theme.get('shadowLight')};
      }
    `};
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const SubtitleContainer = styled.div`
  padding: 0 24px 8px 0;
`

export const TitleCount = styled.span`
  opacity: 0.5;
  font-size: 16px;
  margin-left: 8px;
`
