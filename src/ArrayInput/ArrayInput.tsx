import * as React from 'react'
import { withTheme } from 'styled-components'

import ExpansionPanel from '../ExpansionPanel'
import TextButton from '../TextButton'
import withLabel from '../withLabel'

import ArrayInputProps, { ArrayInputInnerProps } from './ArrayInput.interface'
import { ArrayInputAction } from './ArrayInput.style'
import Item from './Item'

const ArrayInput: React.StatelessComponent<ArrayInputInnerProps> = ({
  items,
  onAppend,
  onDelete,
  onReorder,
  addButtonLabel,
  disabled,
  itemTitleComponent: ItemTitleComponent,
  itemComponent: ItemComponent,
  renderItem: rawRenderItem,
  renderItemTitle: rawRenderItemTitle,
  canBeReordered,
}) => {
  const [openedItem, setOpenedItem] = React.useState(-1)
  const itemsRef: React.MutableRefObject<any[]> = React.useRef(items)

  React.useEffect(() => {
    const amount = items.length
    if (amount > itemsRef.current.length) {
      setOpenedItem(amount - 1)
    }

    itemsRef.current = items
  }, [items])

  const renderItem = rawRenderItem || (props => <ItemComponent {...props} />)
  const renderItemTitle =
    rawRenderItemTitle || (props => <ItemTitleComponent {...props} />)

  return (
    <ExpansionPanel disabled={disabled}>
      {items.map((item, index) => (
        <Item
          key={index}
          renderItem={renderItem}
          renderItemTitle={renderItemTitle}
          item={item}
          index={index}
          open={openedItem === index}
          disabled={disabled}
          canBeReordered={canBeReordered}
          onDelete={onDelete}
          onReorder={onReorder}
          onClick={() => setOpenedItem(prev => (prev === index ? -1 : index))}
        />
      ))}
      <ArrayInputAction>
        <TextButton onClick={onAppend}>{addButtonLabel}</TextButton>
      </ArrayInputAction>
    </ExpansionPanel>
  )
}

ArrayInput.defaultProps = {
  addButtonLabel: 'Ajouter un élément',
  canBeReordered: false,
  items: [],
}

export default withLabel({ padding: 16 })(withTheme(
  ArrayInput
) as React.StatelessComponent<ArrayInputProps>)
