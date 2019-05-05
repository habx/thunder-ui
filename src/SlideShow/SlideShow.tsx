import React from 'react'

import Navigation from './Navigation'
import SlideShowProps from './SlideShow.interface'
import {
  SlideshowContainer,
  SlideshowContent,
  SlideshowElement,
} from './SlideShow.style'

const SlideShow: React.StatelessComponent<SlideShowProps> = ({
  children,
  active,
  color,
  transitionDuration,
  isNavigationVisible,
  onNavigationClick,
  ...rest
}) => {
  const childrenLength = React.Children.toArray(children).length

  return (
    <SlideshowContainer {...rest}>
      <SlideshowContent
        length={childrenLength}
        transitionDuration={transitionDuration}
        data-index={active}
      >
        {React.Children.map(children, child => (
          <SlideshowElement>{child}</SlideshowElement>
        ))}
      </SlideshowContent>
      {isNavigationVisible && (
        <Navigation
          canNavigate={!!onNavigationClick}
          color={color}
          length={childrenLength}
          active={active}
          onClick={onNavigationClick}
        />
      )}
    </SlideshowContainer>
  )
}

SlideShow.defaultProps = {
  isNavigationVisible: true,
  transitionDuration: 200,
}

export default SlideShow
