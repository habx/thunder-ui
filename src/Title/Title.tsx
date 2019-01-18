import * as React from 'react'
import styled, { css } from 'styled-components'

import colors from '../colors'
import TitleProps from './Title.interface'

const prepareProps = props => ({
  color: props.color || colors.maastrichtBlue
})

const BaseTitle = styled.h1.attrs(prepareProps)`
  font-family: Inter UI;
  font-weight: bold;
  color: ${({ color }) => color};
  margin: 0;

  ${({ underline }) => underline && css`
    display: flex;
    flex-direction: column;

    &::after {
      content: '';
      background-color: ${({ color }) => color};
    }
  `}
`

const Title1 = styled(BaseTitle)`
  font-size: 54px;

  &::after {
    width: 128px;
    height: 12px;
  }
`

const Title2 = styled(BaseTitle.withComponent('h2'))`
  font-size: 23px;

  &::after {
    width: 64px;
    height: 6px;
  }
`

const Title3 = styled(BaseTitle.withComponent('h3'))`
  font-size: 18px;
`

const Title4 = styled(BaseTitle.withComponent('h4'))`
  font-size: 14px;
  font-weight: normal;
`

const Title: React.StatelessComponent<TitleProps> = ({ size, ...props }) => {
  if (size === 1) {
    return (
      <Title1 {...props} />
    )
  }

  if (size === 2) {
    return (
      <Title2 {...props} />
    )
  }

  if (size === 3) {
    return (
      <Title3 {...props} />
    )
  }

  return <Title4 {...props} />
}

Title.defaultProps = {
  size: 1
}

export default Title
