import * as React from 'react'
import { withTheme } from 'styled-components'

import { styledTheme } from '../_internal/types'
import ExpansionPanel from '../ExpansionPanel'
import TextButton from '../TextButton'
import withLabel from '../withLabel'

import ArrayInputProps, { ArrayInputInnerProps } from './ArrayInput.interface'
import { ArrayInputAction } from './ArrayInput.style'
import Item from './Item'

const ArrayInput: React.FunctionComponent<ArrayInputInnerProps> = ({
  items,
  onAppend,
  onDelete,
  onReorder,
  disabled,
  addButtonLabel,
  addButtonComponent: AddButtonComponent,
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

  const renderItem =
    rawRenderItem || (ItemComponent && (props => <ItemComponent {...props} />))
  const renderItemTitle =
    rawRenderItemTitle ||
    (ItemTitleComponent && (props => <ItemTitleComponent {...props} />))

  return (
    <ExpansionPanel disabled={disabled} data-testid="array-input">
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
        {AddButtonComponent ? (
          <AddButtonComponent onAppend={onAppend} />
        ) : (
          <TextButton
            data-testid="array-input-add"
            disabled={disabled}
            onClick={() => onAppend()}
          >
            {addButtonLabel}
          </TextButton>
        )}
      </ArrayInputAction>
    </ExpansionPanel>
  )
}

ArrayInput.defaultProps = {
  addButtonLabel: 'Ajouter un élément',
  canBeReordered: false,
  items: [],
  theme: {} as styledTheme,
}

export default withLabel({ padding: 16 })(withTheme(
  ArrayInput
) as React.FunctionComponent<ArrayInputProps>)
