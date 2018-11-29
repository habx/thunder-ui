import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { colors, fontSizes } from '../../theme'


const prepareProps = props => {
  const color = props.color || colors.paynesGrey
  const errorColor = props.errorColor || colors.internationalOrange
  const borderColor = props.borderColor || colors.platinium

  return {
    color: props.error ? errorColor : color,
    borderColor: props.error ? errorColor : borderColor,
    activeBorderColor: props.activeBorderColor || colors.trueBlue,
  }
}

const Input = styled.input.attrs(prepareProps)`
  border: none;
  outline: none;
  
  padding: 2px 0;
  width: 100%;
  
  font-size: ${fontSizes.small};
  line-height: 1.5;

  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  background-color: transparent;
  color: ${({ color }) => color };
  transition: border-bottom-color 150ms ease-in-out;

  &::placeholder {
    color: ${({ color }) => color};
  }

  &:disabled {
    color: ${({ color }) => color};
    border-bottom-color: transparent;
  }
`

const TextInput = ({ onChange, ...props }) => (
  <Input {...props} onChange={e => onChange(e.target.value)} />
)

TextInput.propTypes = {
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  onChange: () => {},
}

export default TextInput
