import styled, { css } from 'styled-components'
import colorUtil from 'color'
import { fontSizes, colors } from '../../theme'
import { withContext } from './context'

const prepareProps = props => {
  const activeColor = props.activeColor || colors.trueBlue
  const color = props.color || colorUtil(colors.maastrichtBlue).fade(0.28).toString()
  return ({
    color,
    activeColor,
    borderBottom: `3px solid ${activeColor}`,
    hoverColor: activeColor || props.hoverColor,
    activeClassName: 'active',
    className: `${props.className} ${props.active ? 'active' : ''}`,
  })
}

const TabsItem = styled.div.attrs(prepareProps)`
  display: flex;
  padding: 16px 8px;
  margin: 0 8px;
  font-size: ${fontSizes.regular};
  color: ${({ color }) => color};
  transition: all 150ms ease-in-out;
  border-bottom: 3px solid transparent;
  ${({ closed }) => closed && css`
    opacity: 0.7;
    text-decoration: line-through;
  `}
  &.active {
    border-bottom: ${({ borderBottom }) => borderBottom};
    color: ${({ activeColor }) => activeColor};
  }
  &:hover {
    text-decoration: none;
    color: ${({ hoverColor }) => hoverColor};
  }
`

export default withContext(TabsItem)
