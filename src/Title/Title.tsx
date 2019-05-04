import * as React from 'react'
import styled, { css } from 'styled-components'

import theme from '../theme'

import TitleProps from './Title.interface'

const BaseTitle = styled.h1`
  color: ${theme.get('neutralStronger')};
  margin: 0;

  ${({ underline }) =>
    underline &&
    css`
      display: flex;
      flex-direction: column;

      &::after {
        content: '';
        color: ${theme.get('neutralStronger')};
      }
    `}
`

const Title1 = styled(BaseTitle)`
  font-size: 32px;
  font-weight: 600;

  &::after {
    width: 128px;
    height: 12px;
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

const Title: React.StatelessComponent<TitleProps> = ({ size, ...props }) => {
  if (size === 1) {
    return <Title1 {...props} />
  }

  if (size === 2) {
    return <Title2 {...props} />
  }

  if (size === 3) {
    return <Title3 {...props} />
  }

  return <Title4 {...props} />
}

Title.defaultProps = {
  size: 1,
}

export default Title
