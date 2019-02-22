import * as React from 'react'

import withIsMobile from '../../_internal/withIsMobile'
import Option from '../Option'
import Modal from '../../Modal'

import OptionsProps from './Options.interface'
import {
  OptionsContainer,
  OptionsModalContent,
  OptionsContent,
  Description,
  DescriptionAnnotation,
  EmptyOptions
} from './Options.style'
import { SelectAllOption } from '../Select.style'

class Options extends React.PureComponent<OptionsProps, {}> {
  renderOptionsContent = (noMaxHeight = false) => {
    const {
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
      isMobile,
      onClose
    } = this.props

    return (
      <OptionsContent noMaxHeight={noMaxHeight}>
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
              {options.map(option => (
                <Option
                  key={option.value}
                  selected={isOptionSelected(option)}
                  onClick={() => onSelect(option)}
                  focused={option === focusedItem}
                  multi={multi}
                  compact={compact}
                  {...option}
                />
              ))}
            </React.Fragment>
          ) : (
            <EmptyOptions>Aucune option</EmptyOptions>
          )
        }
      </OptionsContent>
    )
  }

  render () {
    const {
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
      isMobile,
      onClose
    } = this.props

    if (!isMobile) {
      return (
        <OptionsContainer data-open={open}>
          {this.renderOptionsContent()}
        </OptionsContainer>
      )
    }

    return (
      <Modal
        open={open}
        onClose={onClose}
        noPadding
      >
        <OptionsModalContent>
          {this.renderOptionsContent(true)}
        </OptionsModalContent>
      </Modal>
    )
  }
}

export default withIsMobile(Options)
