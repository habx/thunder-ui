import styled, { css } from 'styled-components'

import shadows from '../shadows'
import borderRadius from '../borderRadius'
import { getMainColor } from '../_internal/colors'

export const CardContainer = styled.div`
  box-shadow: ${shadows.medium};
  border-radius: ${borderRadius.narrow};
  background: ${props => getMainColor(props, { themeKey: 'neutralLightest', propName: 'backgroundColor', acceptError: false })};
  padding: ${({ noPadding }) => noPadding ? '0' : '32px'};

  ${({ interactive }) => interactive && css`
    cursor: pointer;
    transition: box-shadow 150ms ease-in-out;

    &:hover {
      box-shadow: ${shadows.strong};
    }

    &:active {
      box-shadow: ${shadows.light};
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
