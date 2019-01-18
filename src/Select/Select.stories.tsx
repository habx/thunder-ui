import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import Select from '.'

const options = [
  { value: 'sartrouville', label: 'Résidence Aurore' },
  { value: 'saint-maur-raspail', label: 'saint-maur-raspail' },
  { value: 'toulouse-croix-de-pierre', label: 'Croix de Pierre' },
  { value: 'toulouse-colombes', label: 'Les Colombes' },
  { value: 'paris-edison', label: 'Edison Lite' },
  { value: 'toulouse-la-ramee', label: 'La Ramée' },
  { value: 'sarcelles', label: 'Sarcelles Village' },
  { value: 'toulouse-le-galy', label: 'Résidence Le Galy' },
  { value: 'noisy-le-grand', label: 'Noisy-le-Grand' },
  { value: 'toulouse-madera', label: 'Résidence Madera' },
  { value: 'soisy-bailly', label: 'Résidence Le Bailly' },
  { value: 'toulouse-roseraie', label: 'La Roseraie' },
  { value: 'bussy-saint-georges', label: 'Le Hameau du Chêneu' },
  { value: 'toulouse-lodges', label: 'Résidence Cyrano' },
  { value: 'begles-carrelets', label: 'Les Carrelets de l\'Estey' },
  { value: 'groslay', label: 'NordWood' },
  { value: 'toulouse-malepere', label: 'Malepère' },
  { value: 'bagneux-petit', label: 'Résidence Onyx' },
  { value: 'antony-marche', label: 'Antony-Marché' },
  { value: 'vernouillet', label: 'Résidence Eugénie' },
  { value: 'grenoble-cambridge', label: 'Résidence Ginkgo' },
  { value: 'paris-18', label: 'La Parenthèse' },
  { value: 'levallois-zelmis', label: 'Zelmis' },
  { value: 'torcy-le-perchoir', label: 'Le Perchoir' },
  { value: 'massy-vilgenis', label: 'Massy-Vilgénis' }
]

const DEFAULT_VALUE_FULL = options[2]
const DEFAULT_VALUE_SIMPLE = options[2].value

const SelectWithState = ({ value = null, ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <Select
      options={options}
      placeholder='Projet'
      {...newProps}
      onChange={(...args) => {
        action('onChange')(...args)
        newProps.onChange(...args)
      }}
    />
  ))

  return <Component {...props} />
}

storiesOf('Inputs/Select', module)
  .add('single item', () => (
    <SelectWithState />
  ))
  .add('single item with value (label, value mode)', () => (
    <SelectWithState value={DEFAULT_VALUE_FULL} />
  ))
  .add('single item with value (simple value mode)', () => (
    <SelectWithState value={DEFAULT_VALUE_SIMPLE} />
  ))
  .add('single item without reset', () => (
    <SelectWithState canReset={false} />
  ))
  .add('multi items', () => (
    <SelectWithState isMulti />
  ))
  .add('multi items with value (label, value mode)', () => (
    <SelectWithState isMulti value={[DEFAULT_VALUE_FULL]} />
  ))
  .add('multi items with value (simple value mode)', () => (
    <SelectWithState isMulti value={[DEFAULT_VALUE_SIMPLE]} />
  ))
  .add('multi items with icon', () => (
    <SelectWithState isMulti icon={<FontIcon icon='camera_enhance' />} />
  ))
