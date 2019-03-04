import * as React from 'react'
import styled from 'styled-components'
import ListProps from './List.interface'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const List: React.StatelessComponent<ListProps> = ({ hoverColor, clickable, itemsAs, children }) => {
  const itemProps = {
    clickable,
    hoverColor,
    as: itemsAs
  }
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child as React.ReactElement<any>, itemProps)
  )
  return (
    <ListContainer>
      {childrenWithProps}
    </ListContainer>
  )
}

export default List
