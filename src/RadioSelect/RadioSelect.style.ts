import styled, { css } from 'styled-components'

export const RadioSelectContainer = styled.div`
  display: flex;
  height: 36px;
  border-radius: 3px;
  margin: 2px 0;
  align-self: flex-start;

  border: solid 1px ${({ color }) => color};

  &[data-disabled="true"] {
    pointer-events: none;
    filter: grayscale();
  }
`

export const RadioSelectElement = styled.div`
  overflow: hidden;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;

  line-height: 36px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;

  color: ${({ color }) => color};
  border-right: solid 1px ${({ color }) => color};

  transition: all ease-in-out 200ms;

  &:last-child {
    border: none;
  }

  &[data-checked="true"] {
    color: #ffffff;
    background-color: ${({ color }) => color};
    box-shadow: 6px 4px 12px 0 rgba(3, 54, 61, 0.16);

    ${({ isNextSelected }) => !isNextSelected && css`
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;

    `};

    ${({ isPreviousSelected }) => !isPreviousSelected && css`
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    `};
  }
`
