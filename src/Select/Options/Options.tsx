import * as React from 'react'

import Option from '../Option'

import OptionsProps from './Options.interface'
import { OptionsContainer, Description, DescriptionAnnotation, EmptyOptions } from './Options.style'

const Options: React.StatelessComponent<OptionsProps> = ({
  options,
  open,
  description,
  annotation,
  isMulti,
  focusedItem,
  isOptionSelected,
  onSelect
}) => (
  <OptionsContainer data-open={open}>
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
            isMulti={isMulti}
            {...option}
          />
        ))
      ) : (
        <EmptyOptions>Aucune option</EmptyOptions>
      )
    }
  </OptionsContainer>
)

export default Options
