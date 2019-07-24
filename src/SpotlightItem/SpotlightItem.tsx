import * as React from 'react'

import { isFunction } from '../_internal/data'
import FontIcon from '../FontIcon'

import Highlight from './Highlight'
import { ItemInnerProps } from './SpotlightItem.interface'
import {
  ItemContainer,
  ItemContent,
  ItemTitle,
  ItemActions,
  ItemIconContainer,
  ItemTitleInput,
  Title,
  Subtitle,
} from './SpotlightItem.style'

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_EDITING': {
      return { ...state, isEditing: true, value: action.value }
    }

    case 'STOP_EDITING': {
      return { ...state, isEditing: false }
    }

    case 'UPDATE_VALUE': {
      return { ...state, value: action.value }
    }

    default: {
      throw new Error(`Thunder SpotlightItem : Unknown action ${action.type}`)
    }
  }
}

const INITIAL_STATE = {
  isEditing: false,
  value: '',
}

const preventDefault = e => e.preventDefault()

const SpotlightItem: React.FunctionComponent<ItemInnerProps> = ({
  title,
  subtitle,
  icon,
  onDelete,
  onEdit,
  onClick,
  href,
  as,
  query,
  selected,
  registerActions,
  focusOnMount,
  refPropName,
  ...props
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
  const itemContainerRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const containerRef = React.useRef(null)

  const handleSubmit = React.useCallback(
    event => {
      if (containerRef.current) {
        containerRef.current.click()
      }

      if (onClick) {
        onClick(event)
      }
    },
    [onClick]
  )

  const handleEdit = e => {
    e.preventDefault()
    dispatch({ type: 'START_EDITING', value: title })
  }

  const handleDelete = e => {
    e.preventDefault()
    if (isFunction(onDelete)) {
      onDelete(e)
    }
  }

  const handleChange = e => {
    dispatch({ type: 'UPDATE_VALUE', value: e.target.value })
  }

  const handleKeyPress = e => {
    if (
      e.key === 'Enter' &&
      document.activeElement === itemContainerRef.current
    ) {
      handleSubmit(e)
    }
  }

  const handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      handleStopEditing()
    }
  }

  const handleStopEditing = () => {
    dispatch({ type: 'STOP_EDITING' })
    if (isFunction(onEdit)) {
      onEdit(state.value)
    }
  }

  React.useEffect(() => {
    registerActions('submit', handleSubmit)
  }, [handleSubmit, registerActions])

  React.useLayoutEffect(() => {
    if (focusOnMount) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [focusOnMount])

  React.useLayoutEffect(() => {
    if (state.isEditing) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [state.isEditing])

  React.useLayoutEffect(() => {
    if (selected) {
      itemContainerRef.current.focus()
    }
  }, [selected])

  const Container: React.ComponentType<any> | string = React.useMemo(() => {
    if (as) {
      return as
    }

    if (href) {
      return 'a'
    }

    return 'div'
  }, [as, href])

  const containerProps = { [refPropName]: containerRef }

  return (
    <Container {...containerProps} {...props} href={href} as={as}>
      <ItemContainer
        data-editing={state.isEditing}
        ref={itemContainerRef}
        tabIndex={0}
        onClick={handleSubmit}
        onKeyPress={handleKeyPress}
      >
        {icon && <ItemIconContainer>{icon}</ItemIconContainer>}
        <ItemContent>
          <ItemTitle>
            <ItemTitleInput
              ref={inputRef}
              value={state.value}
              onKeyPress={handleInputKeyPress}
              onChange={handleChange}
              onClick={preventDefault}
              onBlur={handleStopEditing}
              data-editing={state.isEditing}
            />
            <Title data-editing={state.isEditing}>
              <Highlight query={query}>{title}</Highlight>
            </Title>
            <ItemActions
              data-editing={state.isEditing}
              onClick={e => e.stopPropagation()}
            >
              {onEdit && (
                <FontIcon icon="edit" onClick={handleEdit} size={18} />
              )}
              {onDelete && (
                <FontIcon icon="delete" onClick={handleDelete} size={18} />
              )}
            </ItemActions>
          </ItemTitle>
          {subtitle && (
            <Subtitle>
              <Highlight query={query}>{subtitle}</Highlight>
            </Subtitle>
          )}
        </ItemContent>
      </ItemContainer>
    </Container>
  )
}

SpotlightItem.defaultProps = {
  refPropName: 'ref',
  as: 'div',
}

export default SpotlightItem
