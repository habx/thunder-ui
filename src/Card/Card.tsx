import * as React from 'react'
import { withTheme } from 'styled-components'

import { getMainColor } from '../_internal/colors'
import Title from '../Title'

import CardProps, { CardInnerProps } from './Card.interface'
import { CardContainer, TitleContainer, SubtitleContainer, TitleCount } from './Card.style'

const BaseCard: React.StatelessComponent<CardInnerProps> = ({ headerPosition, action, title, titleCount, subtitle, children, ...props }) => {
  const titleElement = title && (
    <TitleContainer>
      <Title size={3} color={getMainColor(props, { themeKey: 'neutralDark' })}>
        { title }{(titleCount || titleCount === 0) ? <TitleCount>({ titleCount })</TitleCount> : null}
      </Title>
      { action }
    </TitleContainer>
  )

  return (
    <React.Fragment>
      { headerPosition === 'outside' && titleElement }
      <CardContainer {...props}>
        { headerPosition === 'inside' && titleElement }
        {
          subtitle &&
          <SubtitleContainer>
            <Title size={4} color={getMainColor(props, { themeKey: 'neutral' })}>{ subtitle }</Title>
          </SubtitleContainer>
        }
        { children }
      </CardContainer>
    </React.Fragment>
  )
}

BaseCard.defaultProps = {
  headerPosition: 'inside',
  theme: {}
}

const Card: React.StatelessComponent<CardProps> = withTheme(BaseCard)

export default Card
