import * as React from 'react'

import Option from '../Option'

import OptionsProps from './Options.interface'
import { OptionsContainer, OptionsContent, Description, DescriptionAnnotation, EmptyOptions } from './Options.style'

const Options: React.StatelessComponent<OptionsProps> = ({
  options,
  open,
  compact,
  description,
  annotation,
  multi,
  focusedItem,
  isOptionSelected,
  onSelect
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
          options.map(option => (
            <Option
              key={option.value}
              selected={isOptionSelected(option)}
              onClick={() => onSelect(option)}
              focused={option === focusedItem}
              multi={multi}
              compact={compact}
              {...option}
            />
          ))
        ) : (
          <EmptyOptions>Aucune option</EmptyOptions>
        )
      }
    </OptionsContent>
  </OptionsContainer>
)

export default Options
