import * as React from 'react'
import { withTheme } from 'styled-components'

import theme from '../theme'
import Title from '../Title'

import CardProps, { CardInnerProps } from './Card.interface'
import { CardContainer, TitleContainer, SubtitleContainer, TitleCount } from './Card.style'

const BaseCard: React.StatelessComponent<CardInnerProps> = ({ headerPosition, action, title, titleCount, subtitle, children, error, warning, ...props }) => {
  const titleElement = title && (
    <TitleContainer>
      <Title
        size={3}
        error={error}
        warning={warning}
        color={theme.get('neutralStronger', { dynamic: true })}
      >
        { title }{(titleCount || titleCount === 0) ? <TitleCount>({ titleCount })</TitleCount> : null}
      </Title>
      { action }
    </TitleContainer>
  )

  return (
    <React.Fragment>
      { headerPosition === 'outside' && titleElement }
      <CardContainer {...props} error={error} warning={warning}>
        { headerPosition === 'inside' && titleElement }
        {
          subtitle &&
          <SubtitleContainer>
            <Title
              size={4}
              error={error}
              warning={warning}
              color={theme.get('neutralStronger', { dynamic: true })}
            >
              { subtitle }
            </Title>
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
