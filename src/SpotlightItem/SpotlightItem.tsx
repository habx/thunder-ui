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

const reducer = (
  state: { isEditing: boolean; value: string },
  action: { type: string; value?: string }
): { isEditing: boolean; value: string } => {
  switch (action.type) {
    case 'START_EDITING': {
      return { ...state, isEditing: true, value: action.value || '' }
    }

    case 'STOP_EDITING': {
      return { ...state, isEditing: false }
    }

    case 'UPDATE_VALUE': {
      return { ...state, value: action.value || '' }
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

const preventDefault = (e: Event | React.MouseEvent) => e.preventDefault()

const SpotlightItem: React.FunctionComponent<ItemInnerProps> = ({
  title,
  subtitle,
  icon,
  onDelete,
  onEdit,
  onClick,
  href,
  as = 'div',
  query,
  selected,
  registerActions,
  focusOnMount,
  refPropName = 'ref',
  ...props
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
  const itemContainerRef = React.useRef<HTMLLIElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

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

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({ type: 'START_EDITING', value: title })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFunction(onDelete)) {
      onDelete()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_VALUE', value: e.target.value })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      document.activeElement === itemContainerRef.current
    ) {
      handleSubmit(e)
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
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
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [focusOnMount])

  React.useLayoutEffect(() => {
    if (state.isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [state.isEditing])

  React.useLayoutEffect(() => {
    if (selected && itemContainerRef.current) {
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

export default SpotlightItem
