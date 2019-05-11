import get from 'lodash.get'
import * as React from 'react'

import { omit } from '../../_internal/data'
import SpotlightContext from '../Spotlight.context'
import { SpotlightContextProps } from '../Spotlight.interface'

import SpotlightIcon from './icon'
import SpotlightContentProps, {
  ItemRegistrationData,
} from './SpotlightContent.interface'
import {
  SpotlightSearchContainer,
  SpotlightSearch,
  SpotlightSections,
} from './SpotlightContent.style'

const SpotlightContent: React.FunctionComponent<SpotlightContentProps> = ({
  children,
  query,
  data,
  placeholder,
  inputRef,
  onClose,
  onQueryChange,
}) => {
  const [selectedItem, setSelectedItem] = React.useState(-1)
  const items: React.MutableRefObject<{
    [key: string]: ItemRegistrationData[]
  }> = React.useRef({})

  const getAllItemKeys = React.useCallback(
    (): ItemRegistrationData[] =>
      Object.values(items.current).reduce(
        (
          acc: ItemRegistrationData[],
          sectionItems: { [key: number]: ItemRegistrationData }
        ) => [
          ...acc,
          ...Object.values(sectionItems).sort((a, b) =>
            a.index > b.index ? 1 : -1
          ),
        ],
        []
      ),
    []
  )

  const selectedItemKey = get(getAllItemKeys(), [selectedItem, 'key'])

  const registerItem = React.useCallback(
    (sectionName: string, item: ItemRegistrationData) => {
      items.current = {
        ...items.current,
        [sectionName]: {
          ...get(items.current, sectionName, {}),
          [item.key]: item,
        },
      }
    },
    []
  )

  const unRegisterItem = React.useCallback(
    (sectionName: string, itemKey: number) => {
      items.current = {
        ...items.current,
        [sectionName]: omit(items.current[sectionName], [itemKey]),
      }
    },
    []
  )

  const handleClose = React.useCallback(() => {
    setSelectedItem(-1)
    onClose()
  }, [onClose])

  const context: SpotlightContextProps = React.useMemo(
    () => ({
      query,
      selectedItemKey,
      data,
      registerItem,
      unRegisterItem,
      close: handleClose,
    }),
    [data, handleClose, query, registerItem, selectedItemKey, unRegisterItem]
  )

  React.useEffect(() => {
    const handleKeyDown = event => {
      const { key, shiftKey } = event

      if (['ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
        event.preventDefault()

        setSelectedItem(prev => {
          if (key === 'ArrowUp' || (key === 'Tab' && shiftKey)) {
            return prev >= 0 ? prev - 1 : getAllItemKeys().length - 1
          }

          if (key === 'ArrowDown' || (key === 'Tab' && !shiftKey)) {
            return prev < getAllItemKeys().length - 1 ? prev + 1 : -1
          }

          return null
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [getAllItemKeys])

  React.useEffect(() => {
    if (selectedItem === -1) {
      inputRef.current.select()
    }
  }, [inputRef, selectedItem])

  const handleSearch = React.useCallback(
    e => {
      setSelectedItem(-1)
      onQueryChange(e.target.value)
    },
    [onQueryChange]
  )

  const handleFocus = React.useCallback(() => setSelectedItem(-1), [])

  const handleSearchKeyPress = React.useCallback(
    event => {
      const { key } = event

      if (key === 'Enter') {
        const items = getAllItemKeys()
        if (items.length > 0) {
          items[0].onSubmit(event)
        }
      }
    },
    [getAllItemKeys]
  )

  return (
    <SpotlightContext.Provider value={context}>
      <SpotlightSearchContainer>
        <SpotlightIcon />
        <SpotlightSearch
          onKeyPress={handleSearchKeyPress}
          ref={inputRef}
          onFocus={handleFocus}
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
        />
      </SpotlightSearchContainer>
      <SpotlightSections>{children}</SpotlightSections>
    </SpotlightContext.Provider>
  )
}

SpotlightContent.defaultProps = {
  data: {},
  placeholder: 'Aller à...',
}

export default SpotlightContent
