import * as React from 'react'
import styled, { css } from 'styled-components'
import colors from '../colors'
import SectionTitleProps from './SectionTitle.interface'

const prepareProps = props => ({
  color: props.color || colors.maastrichtBlue
})

const SectionTitle: React.StatelessComponent<SectionTitleProps> = styled.h3.attrs(prepareProps)`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;

  color: ${({ color }) => color};

  ${({ active }) => active && css`
    &::after {
      content: '';
      height: 3px;
      width: 100%;
      flex: 0 0 auto;
      background-color: ${({ color }) => color};
    }
  `}
`

export default SectionTitle
