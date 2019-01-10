import * as React from 'react'

import { ActionBarContainer } from './ImageUploader.style'

import TextButton from '../../TextButton'

const ActionBar = ({ onSelect, onCustomize }) => (
  <ActionBarContainer>
      <TextButton onClick={onSelect}>Sélectionner</TextButton>
      <TextButton onClick={onCustomize}>Personnaliser</TextButton>
  </ActionBarContainer>
)

export default ActionBar
