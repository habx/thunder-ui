import * as React from 'react'

import Option from '../Option'

import OptionsProps from './Options.interface'
import { OptionsContainer, OptionsContent, Description, DescriptionAnnotation, EmptyOptions } from './Options.style'
import { SelectAllOption } from '../Select.style'

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
  selectAllLabel
}) => (
  <OptionsContainer data-open={open}>
    <OptionsContent>
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
  </OptionsContainer>
)

export default Options
