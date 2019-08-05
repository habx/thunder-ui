import * as React from 'react'

import { NavigationProps } from './SlideShow.interface'
import { NavigationDotsContainer, Dot } from './SlideShow.style'

const Navigation: React.FunctionComponent<NavigationProps> = ({
  length,
  active,
  onClick = () => {},
  color,
  canNavigate = true,
}) => (
  <NavigationDotsContainer canNavigate={canNavigate}>
    {Array.from(Array(length)).map((_, index) => (
      <Dot
        color={color}
        key={index}
        data-active={index === active}
        onClick={() => onClick(index)}
      />
    ))}
  </NavigationDotsContainer>
)

export default Navigation
