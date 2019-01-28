import styled, { css } from 'styled-components'

import colors from '../colors'
import fontSizes from '../fontSizes'
import shadows from '../shadows'

export const SelectContainer = styled.div`
  position: relative;
  width: 250px;
  flex: 0 0 auto;

  color: ${colors.maastrichtBlue}

  ${({ disabled }) => disabled && css`
    pointer-events: none;
    opacity: 0.8;
    filter: grayscale();
  `};
`

export const SelectContent = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  box-sizing: border-box;
  cursor: pointer;

  z-index: 0;
  padding: 8px 4px;
  height: 40px;
  line-height: 24px;
  border-bottom: 1px solid ${({ color }) => color};

  font-size: ${fontSizes.regular};
  user-select: none;

  background-color: #ffffff;

  &[data-open="true"] {
    transition: z-index ease-in 0s;
    z-index: 10;
  }
`

export const SearchInput = styled.input.attrs(() => ({
  type: 'text'
}))`
  flex: 1 1 100%;

  border: none;
  padding: 0;
  background: none;
  color: ${colors.maastrichtBlue};
  font-size: inherit;
  align-self: stretch;
  min-width: 0;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: ${({ color }) => color};
  }
`

export const Placeholder = styled.div`
  flex: 1 1 100%;
  align-self: stretch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
`

export const LabelIcons = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  i {
    margin-left: 6px;
  }
`

export const CustomIconContainer = styled.div`
  margin-right: 8px;
  align-self: stretch;
  color: ${colors.paynesGrey};
`
