import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { colors, fontSizes } from '../../theme'
import Spinner from '../Spinner'


const prepareProps = props => {
  const errorColor = props.errorColor || colors.internationalOrange
  const borderColor = props.borderColor || colors.platinium

  return {
    color: props.color || colors.paynesGrey,
    borderColor: props.error ? errorColor : borderColor,
    activeBorderColor: props.activeBorderColor || colors.trueBlue,
  }
}

const InputContainer = styled.div.attrs(prepareProps)`
  position: relative;
  .hover-element-right {
    opacity: 0;
    transition: opacity 150ms ease-in-out;
    i {
      color: ${({ borderColor }) => borderColor};
    }
  }
  &:hover {
   .hover-element-right {
      opacity: 1;
      transition: opacity 150ms ease-in-out; 
    }
  }
`

const InputSpinner = styled(Spinner)`
  position: absolute;
  right: 0;
  top: 4px;
`

const RightElementContainer = styled.div.attrs(prepareProps)`
  position: absolute;
  right: 0;
  top: 4px;
  i {
    color: ${({ color }) => color};
    font-size: 15px;
  }
`

const Input = styled.input.attrs(prepareProps)`
  border: none;
  outline: none;
  
  padding: 2px 0;

  width: 100%;
  
  font-size: ${fontSizes.small};
  line-height: 1.5;
  transition: border-bottom-color 150ms ease-in-out;
  border-bottom: 1px solid ${({ error, borderColor }) => (error ? borderColor : 'transparent')};
  &:hover {
    border-bottom-color: ${({ borderColor }) => borderColor};
  }
  background-color: transparent;
  color: ${({ color }) => color};

  &::placeholder {
    color: ${({ color }) => color};
  }

  &:disabled {
    color: ${({ color }) => color};
    border-bottom-color: transparent;
  }
  
  ${({ error }) => !error && css`
    &:not(:disabled):focus {
      border-bottom-color: ${({ activeBorderColor }) => activeBorderColor};
    }
  `};
`

const TextInput = ({ onChange, isLoading, rightHoverElement, rightElement, ...props }) => (
  <InputContainer {...props}>
    <Input {...props} onChange={e => onChange(e.target.value)} isLoading={isLoading} />
    {isLoading && <InputSpinner size={15} />}
    {rightHoverElement && <RightElementContainer {...props} className='hover-element-right'>{rightHoverElement}</RightElementContainer>}
    {rightElement && <RightElementContainer {...props}>{rightElement}</RightElementContainer>}
  </InputContainer>
)

TextInput.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  rightElement: PropTypes.node,
  rightHoverElement: PropTypes.node,
}

TextInput.defaultProps = {
  onChange: () => {},
  isLoading: false,
  rightElement: null,
  rightHoverElement: null,
}

export default TextInput
