import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import FontIcon from '../FontIcon'

import { withArrayContext } from './context'

import { ItemHeaderContainer, ItemHeaderContent, ItemActions } from './style'

const ItemHeader = ({ context, item, index }) => {
  const isOpen = context.editing === index

  return (
    <ItemHeaderContainer>
      <ItemHeaderContent>
        {context.itemTitle && context.itemTitle(item)}
      </ItemHeaderContent>
      <ItemActions>
        { isOpen && (
          <Fragment>
            <FontIcon icon='delete' onClick={() => context.onDelete(index)} />
            <FontIcon icon='close' onClick={context.onClose} />
          </Fragment>
        ) }
        { !isOpen && <FontIcon icon='edit' onClick={() => context.onOpen(index)} /> }
      </ItemActions>
    </ItemHeaderContainer>
  )
}

ItemHeader.propTypes = {
  context: PropTypes.shape({
    itemTitle: PropTypes.func,
  }).isRequired,
  item: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withArrayContext(ItemHeader)
