import * as React from 'react'

import { ActionBarProps } from './ImageUploader.interface'
import { ActionBarContainer } from './ImageUploader.style'

import TextButton from '../../TextButton'

const ActionBar: React.StatelessComponent<ActionBarProps> = ({ onSelect, onCustomize }) => (
  <ActionBarContainer>
      <TextButton onClick={onSelect}>Sélectionner</TextButton>
      <TextButton onClick={onCustomize}>Personnaliser</TextButton>
  </ActionBarContainer>
)

export default ActionBar
