import * as React from 'react'
import styled, { css } from 'styled-components'

import theme from '../theme'

import TitleProps from './Title.interface'

const BaseTitle = styled.h1`
  color: ${theme.get('neutralStronger', { dynamic: true })};
  margin: 0;

  ${({ underline }) =>
    underline &&
    css`
      display: flex;
      flex-direction: column;

      &::after {
        content: '';
        background-color: ${theme.get('neutralStronger', { dynamic: true })};
      }
    `}
`

const Title1 = styled(BaseTitle)`
  font-size: 32px;
  font-weight: 600;

  &::after {
    width: 128px;
    margin-top: 4px;
    height: 10px;
  }
`

const Title2 = styled(BaseTitle.withComponent('h2'))`
  font-size: 24px;
  font-weight: 600;

  &::after {
    width: 64px;
    height: 6px;
  }
`

const Title3 = styled(BaseTitle.withComponent('h3'))`
  font-size: 18px;
  font-weight: 500;
`

const Title4 = styled(BaseTitle.withComponent('h4'))`
  font-size: 14px;
  font-weight: 500;
`

const components = {
  1: Title1,
  2: Title2,
  3: Title3,
  4: Title4,
}

const Title: React.FunctionComponent<TitleProps> = ({ size, ...props }) => {
  const TitleComponent = components[size] || Title

  return <TitleComponent {...props} />
}

Title.defaultProps = {
  size: 1,
}

export default Title
