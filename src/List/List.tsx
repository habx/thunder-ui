import * as React from 'react'
import styled from 'styled-components'

import ListContext from './List.context'
import ListProps from './List.interface'

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`

const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { hoverColor, clickable, itemsAs, children, ...rest } = props

  const context = React.useMemo(
    () => ({
      clickable,
      hoverColor,
      as: itemsAs,
    }),
    [clickable, hoverColor, itemsAs]
  )

  return (
    <ListContext.Provider value={context}>
      <ListContainer {...rest} ref={ref}>
        {children}
      </ListContainer>
    </ListContext.Provider>
  )
})

export default List
