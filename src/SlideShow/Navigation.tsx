import * as React from 'react'

import { NavigationDotsContainer, Dot } from './SlideShow.style'
import { NavigationProps } from './SlideShow.interface'

const Navigation: React.StatelessComponent<NavigationProps> = ({ length, active, onClick, color, canNavigate }) => (
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

Navigation.defaultProps = {
  canNavigate: true,
  onClick: () => null
}

export default Navigation
