import React from 'react'
import styled, { css } from 'styled-components'

import Title from '../Title'
import { borderRadius, colors, shadows } from '../../theme'

const CardContainer = styled.div`
  box-shadow: ${shadows.light};
  border-radius: ${borderRadius.narrow};
  
  
  ${({ clickable }) => clickable && css`
    cursor: pointer;
    transition: box-shadow 150ms ease-in-out;
    
    &:hover {
      box-shadow: ${shadows.strong};
    }
  `};
`

const TitleContainer = styled.div`
  padding: 24px 24px 8px 24px;
`

const SubtitleContainer = styled.div`
  padding: 0 24px 8px 24px;
`

const Card = ({ title, subtitle, children, ...props }) => (
  <CardContainer {...props}>
    {
      title &&
      <TitleContainer>
        <Title size={3}>{ title }</Title>
      </TitleContainer>
    }
    {
      subtitle &&
      <SubtitleContainer>
        <Title size={4} color={colors.paynesGrey}>{ subtitle }</Title>
      </SubtitleContainer>
    }
    { children }
  </CardContainer>
)

export default Card
