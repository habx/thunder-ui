import * as React from 'react'

import { ActionBarProps } from './ImageUploader.interface'
import { ActionBarContainer } from './ImageUploader.style'

import TextButton from '../../TextButton'

const ActionBar: React.StatelessComponent<ActionBarProps> = ({ page, onSelect, onCustomize, onValidateCustomization, canCustomize }) => (
  <ActionBarContainer>
    {
      page === 'directory' && (
        <React.Fragment>
          <TextButton onClick={onSelect}>Sélectionner</TextButton>
          { canCustomize && <TextButton onClick={onCustomize}>Personnaliser</TextButton> }
        </React.Fragment>
      )
    }
    {
      page === 'customizer' && (
        <React.Fragment>
          <TextButton onClick={onValidateCustomization}>Valider</TextButton>
        </React.Fragment>
      )
    }
  </ActionBarContainer>
)

export default ActionBar
