import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import Select from './index'

const options = [{ value: 'sartrouville', label: 'Résidence Aurore' }, { value: 'saint-maur-raspail', label: 'saint-maur-raspail' }, { value: 'toulouse-croix-de-pierre', label: 'Croix de Pierre' }, { value: 'toulouse-colombes', label: 'Les Colombes' }, { value: 'paris-edison', label: 'Edison Lite' }, { value: 'toulouse-la-ramee', label: 'La Ramée' }, { value: 'sarcelles', label: 'Sarcelles Village' }, { value: 'toulouse-le-galy', label: 'Résidence Le Galy' }, { value: 'noisy-le-grand', label: 'Noisy-le-Grand' }, { value: 'toulouse-madera', label: 'Résidence Madera' }, { value: 'soisy-bailly', label: 'Résidence Le Bailly' }, { value: 'toulouse-roseraie', label: 'La Roseraie' }, { value: 'bussy-saint-georges', label: 'Le Hameau du Chêneu' }, { value: 'toulouse-lodges', label: 'Résidence Cyrano' }, { value: 'begles-carrelets', label: 'Les Carrelets de l\'Estey' }, { value: 'groslay', label: 'NordWood' }, { value: 'toulouse-malepere', label: 'Malepère' }, { value: 'bagneux-petit', label: 'Résidence Onyx' }, { value: 'antony-marche', label: 'Antony-Marché' }, { value: 'vernouillet', label: 'Résidence Eugénie' }, { value: 'grenoble-cambridge', label: 'Résidence Ginkgo' }, { value: 'paris-18', label: 'La Parenthèse' }, { value: 'levallois-zelmis', label: 'Zelmis' }, { value: 'torcy-le-perchoir', label: 'Le Perchoir' }, { value: 'massy-vilgenis', label: 'Massy-Vilgénis' }]

const enhance = withState('value', 'onChange', [{ value: 'sartrouville', label: 'Résidence Aurore' }])
const enhanceOne = withState('value', 'onChange', { value: 'sartrouville', label: 'Résidence Aurore' })

storiesOf('Inputs/Select', module)
  .add('single item', () => {
    const SelectWithState = enhanceOne(({ value, onChange }) => (
      <Select options={options} label='Projet' value={value} onChange={onChange} />
    ))
    return <SelectWithState />
  })
  .add('single item without reset', () => {
    const SelectWithState = enhanceOne(({ value, onChange }) => (
      <Select options={options} label='Projet' value={value} onChange={onChange} canReset={false} />
    ))
    return <SelectWithState />
  })
  .add('multi items', () => {
    const SelectWithState = enhance(({ value, onChange }) => (
      <Select isMulti options={options} label='Projets' value={value} onChange={onChange} />
    ))
    return <SelectWithState />
  })
  .add('multi items with icon', () => {
    const SelectWithState = enhance(({ value, onChange }) => (
      <Select isMulti options={options} label='Projets' value={value} onChange={onChange} icon={<FontIcon icon='camera_enhance' />} />
    ))
    return <SelectWithState />
  })
