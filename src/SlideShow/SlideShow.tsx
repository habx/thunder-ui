import React from 'react'

import colors from '../colors'

import Navigation from './Navigation'
import { SlideshowContainer, SlideshowContent, SlideshowElement } from './SlideShow.style'
import SlideShowProps from './SlideShow.interface'

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
  color: colors.trueBlue,
  transitionDuration: 200
}

export default SlideShow
