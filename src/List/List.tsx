import * as React from 'react'
import styled from 'styled-components'
import ListProps from './List.interface'
import { Context } from './context'

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`

const List: React.StatelessComponent<ListProps> = ({ hoverColor, clickable, itemsAs, children }) => {
  const itemProps = {
    clickable,
    hoverColor,
    as: itemsAs
  }
  return (
    <Context.Provider value={itemProps}>
      <ListContainer>
        {children}
      </ListContainer>
    </Context.Provider>
  )
}

export default List
