import * as React from 'react'

import Option from '../Option'
import Modal from '../../Modal'
import { useIsSmallScreen } from '../../_internal/hooks'

import OptionsProps from './Options.interface'
import {
  OptionsContainer,
  OptionsModalContent,
  OptionsContent,
  Description,
  DescriptionAnnotation,
  EmptyOptions,
  SelectAllOption
} from './Options.style'

const Options: React.StatelessComponent<OptionsProps> = ({
  options,
  open,
  compact,
  description,
  annotation,
  multi,
  focusedItem,
  isOptionSelected,
  allSelected,
  onSelect,
  onSelectAll,
  canSelectAll,
  selectAllLabel,
  onClose,
  optionDisabled,
  wrapperWidth
}) => {
  const isSmallScreen = useIsSmallScreen()

  const content = (
    <OptionsContent noMaxHeight={isSmallScreen}>
      {description && (
        <Description>
          <div>{description}</div>
          <DescriptionAnnotation>{annotation}</DescriptionAnnotation>
        </Description>
      )}
      {options.length > 0
        ? (
          <React.Fragment>
            {multi && canSelectAll && (
              <SelectAllOption
                selected={allSelected}
                focused={false}
                onClick={() => onSelectAll(!allSelected)}
                multi={multi}
                compact={compact}
                label={selectAllLabel || 'Select all'}
              />
            )}
            {options.map(option => {
              const disabled = React.useMemo(() => optionDisabled(option), [option])
              return (
                <Option
                  key={option.value}
                  selected={isOptionSelected(option)}
                  onClick={() => !disabled ? onSelect(option) : null}
                  focused={option === focusedItem}
                  multi={multi}
                  compact={compact}
                  disabled={disabled}
                  {...option}
                />
              )
            })}
          </React.Fragment>
        ) : (
          <EmptyOptions>Aucune option</EmptyOptions>
        )
      }
    </OptionsContent>
  )

  if (isSmallScreen) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        noPadding
      >
        <OptionsModalContent>
          {content}
        </OptionsModalContent>
      </Modal>
    )
  }

  return (
    <OptionsContainer data-open={open} minWidth={wrapperWidth}>
      {content}
    </OptionsContainer>
  )
}

export default Options
