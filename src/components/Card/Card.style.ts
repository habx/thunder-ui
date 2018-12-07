import styled, { css } from 'styled-components'
import { shadows, borderRadius } from '../../theme'

export const CardContainer = styled.div`
  box-shadow: ${shadows.light};
  border-radius: ${borderRadius.narrow};

  ${({ interactive }) => interactive && css`
    cursor: pointer;
    transition: box-shadow 150ms ease-in-out;

    &:hover {
      box-shadow: ${shadows.strong};
    }
  `};
`

export const TitleContainer = styled.div`
  padding: 24px 24px 8px 24px;
`

export const SubtitleContainer = styled.div`
  padding: 0 24px 8px 24px;
`
