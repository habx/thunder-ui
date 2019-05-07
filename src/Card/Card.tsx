import * as React from 'react'
import { withTheme } from 'styled-components'

import { styledTheme } from '../_internal/types'
import theme from '../theme'
import Title from '../Title'

import CardProps, { CardInnerProps } from './Card.interface'
import {
  CardContainer,
  TitleContainer,
  SubtitleContainer,
  TitleCount,
} from './Card.style'

const Card: React.ComponentType<
  CardInnerProps & React.ClassAttributes<any>
> = React.forwardRef((props, ref) => {
  const {
    headerPosition,
    action,
    title,
    titleCount,
    subtitle,
    children,
    error,
    warning,
    ...rest
  } = props

  const color = theme.get('neutralStronger', { dynamic: true })(props)

  const titleElement = title && (
    <TitleContainer>
      <Title size={3} error={error} warning={warning} color={color}>
        {title}
        {titleCount || titleCount === 0 ? (
          <TitleCount>({titleCount})</TitleCount>
        ) : null}
      </Title>
      {action}
    </TitleContainer>
  )

  return (
    <React.Fragment>
      {headerPosition === 'outside' && titleElement}
      <CardContainer {...rest} error={error} warning={warning} ref={ref}>
        {headerPosition === 'inside' && titleElement}
        {subtitle && (
          <SubtitleContainer>
            <Title
              size={4}
              error={error}
              warning={warning}
              color={theme.get('neutralStronger', { dynamic: true })}
            >
              {subtitle}
            </Title>
          </SubtitleContainer>
        )}
        {children}
      </CardContainer>
    </React.Fragment>
  )
})

Card.defaultProps = {
  headerPosition: 'inside',
  theme: {} as styledTheme,
}

export default withTheme(Card) as React.StatelessComponent<CardProps>
