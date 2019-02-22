import styled, { css } from 'styled-components'

export const NavBarItemTooltip = styled.span`
  max-width: 44px;
  overflow: hidden;
  position: absolute;
  top: 8px;
  left: 0;
  z-index: 50;
  opacity: 0;
  height: calc(100% - 16px);
  line-height: calc(100% - 16px);
  border-radius: 22px;
  font-family: "Inter UI", sans-serif;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${({ activebackgroundcolor }) => activebackgroundcolor};
  transition: max-width 150ms linear;

  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    background-color: initial;
  }

`

export const NavBarItemTooltipContent = styled.div`
  padding: 0 16px 0 8px;
`

export const NavBarItemContainer = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 0;
  color: #f9f9fb;

  i {
    padding: 7px 12px;
    font-size: 20px;
    border-radius: 50%;
  }

  &.active i {
    background-color: ${({ activebackgroundcolor }) => activebackgroundcolor};

  }

  ${({ active }) => active && css`
    i {
      background-color: ${({ activebackgroundcolor }) => activebackgroundcolor};

      @media (max-width: 600px) {
        background-color: initial;
      }
    }
  `}

  &:hover {
    ${NavBarItemTooltip} {
      max-width: 250px;
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    font-weight: normal;

    ${NavBarItemTooltip} {
      max-width: 300px;
      opacity: 1;
    }
  }
`
