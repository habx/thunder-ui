import styled from 'styled-components'

import { colors, fontSizes } from '../../theme'

export const SelectContainer = styled.div`
  position: relative;
  color: ${colors.maastrichtBlue};
`

export const Label = styled.div`

  position: relative;
  display: flex;
  align-items: baseline;
  box-sizing: border-box;

  z-index: 0;
  padding: 8px 20px;
  height: 40px;
  line-height: 24px;
  border-radius: 4px;
  border-left: 0;

  font-size: ${fontSizes.regular};
  user-select: none;

  background-color: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(3, 54, 61, 0.16);

  transition: background-color ease-in-out 200ms, z-index ease-in 1s, border-left ease-in 200ms;

  &:not([data-empty="true"]) {
    border-left: 4px solid ${colors.internationalOrange};
  }

  &[data-open="true"] {
    transition: z-index ease-in 0s;
    z-index: 10;
  }

  &:hover {
    background-color: #f8f7f8; // TODO : Add to colors
    cursor: pointer;
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

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

export const LabelIcons = styled.div`
  flex: 0 0 auto;
  display: flex;

  i {
    margin: 0 12px;
  }
`

export const Options = styled.div`
  box-sizing: border-box;
  box-shadow: 0 4px 12px 0 rgba(3, 54, 61, 0.16);
  position: absolute;
  top: 0;
  padding: 0 24px;
  overflow-y: scroll;

  width: calc(100% - 24px);
  margin-right: 12px;
  margin-left: 12px;
  background-color: #ffffff;
  border-radius: 0 0 4px 4px;
  height: 0;
  z-index: 5;

  transition: all ease-in-out 300ms;

  &[data-open="true"] {
    top: 100%;
    height: 300px;
    padding: 24px;
  }
`

export const OptionsActions = styled.div`
  color: ${colors.trueBlue};
  text-decoration: underline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const OptionAction = styled.span`
  user-select: none;
  font-size: ${fontSizes.tiny};

  &:hover {
    opacity: .8;
    cursor: pointer;
  }
`

export const Description = styled.div`
  margin: 4px 0 8px;
  padding: 4px 4px 16px;
  border-bottom: solid 1px #5a6e85; // TODO : Add to colors
`

export const CustomIconContainer = styled.div`
  margin-right: 8px;
  align-self: stretch;
  color: ${colors.paynesGrey};
`

export const OptionContainer = styled.div`
  transition: color ease-in 150ms;
  outline: none;
  cursor: pointer;
  user-select: none;
  margin-bottom: 8px;
  font-size: ${fontSizes.small};
  i {
    vertical-align: middle;
    margin-right: 4px;
  }

  &:hover,
  &:focus,
  &[data-selected="true"] {
    color: ${colors.internationalOrange};
  }
`
