import * as React from 'react'
import styled from 'styled-components'

import colors from '../../colors'
import borderRadius from '../../borderRadius'

import ProgressProps from './Progress.interface'

const getProgressionColor = progression => {
  if (progression <= 30) {
    return colors.internationalOrange
  }

  if (progression <= 60) {
    return colors.uscGold
  }

  return colors.brightCerualean
}

const prepareProps = props => ({
  color: props.color || getProgressionColor(props.progression)
})

const Progress: React.StatelessComponent<ProgressProps> = styled.div.attrs(prepareProps)`
  position: relative;

  height: 9px;
  width: 392px;
  max-width: 100%;
  border-radius: ${borderRadius.narrow};
  background-color: ${colors.paynesGrey};
  overflow: hidden;

  &::after {
    content: "";
    background-color: ${({ color }) => color};

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${({ progression }) => progression}%;
  }
`

export default Progress
