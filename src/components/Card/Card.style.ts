import styled, { css } from 'styled-components'
import { shadows, borderRadius } from '../../theme'

export const CardContainer = styled.div`
  box-shadow: ${shadows.light};
  border-radius: ${borderRadius.narrow};
  background: #fff;
  padding: 32px;
  height: 100%;
  overflow-y: auto;

  ${({ interactive }) => interactive && css`
    cursor: pointer;
    transition: box-shadow 150ms ease-in-out;

    &:hover {
      box-shadow: ${shadows.strong};
    }
  `};
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const SubtitleContainer = styled.div`
  padding: 0 24px 8px 24px;
`

export const TitleCount = styled.span`
  opacity: 0.5;
  font-size: 16px;
  margin-left: 8px;
`
