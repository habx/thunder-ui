import * as React from 'react'

import { styledTheme } from '../_internal/types'
import theme from '../theme'
import Title from '../Title'
import useTheme from '../useTheme'

import CardProps from './Card.interface'
import {
  CardContainer,
  TitleContainer,
  SubtitleContainer,
  TitleCount,
} from './Card.style'

const Card = React.forwardRef<HTMLDivElement, CardProps>((baseProps, ref) => {
  const thunderUi = useTheme()
  const fullTheme = { thunderUi } as styledTheme

  const props = { ...baseProps, theme: fullTheme }

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
            <Title size={4} error={error} warning={warning} color={color}>
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
}

export default Card
