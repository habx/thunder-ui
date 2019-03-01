import styled, { css } from 'styled-components'

import fontSizes from '../fontSizes'

import FontIcon from '../FontIcon'

export const SelectContainer = styled.div`
  position: relative;
  width: 250px;
  flex: 0 0 auto;

  ${({ disabled }) => disabled && css`
    pointer-events: none;
    opacity: 0.6;
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
  color: ${({ color }) => color};
  font-size: inherit;
  align-self: stretch;
  min-width: 0;
  transition: color 150ms ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: none;

    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: ${({ color }) => color};
    transition: opacity 150ms ease-in-out;
  }
`

export const Placeholder = styled.div`
  flex: 1 1 100%;
  align-self: stretch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 150ms ease-in-out;
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
`

export const ResetIcon = styled(FontIcon)`
  transition: opacity 150ms ease-in-out;

  &:not([data-visible="true"]) {
    opacity: 0;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
