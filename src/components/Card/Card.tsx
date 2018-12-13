import * as React from 'react'

import Title from '../Title'
import { borderRadius, colors, shadows } from '../../theme'

import CardProps from './Card.interface'
import { CardContainer, TitleContainer, SubtitleContainer } from './Card.style'

const Card: React.FunctionComponent<CardProps> = ({ title, subtitle, children, ...props }) => (
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
