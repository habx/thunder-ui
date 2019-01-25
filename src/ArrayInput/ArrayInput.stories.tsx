import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { take, takeRight, clone } from 'lodash'

import ArrayInput from '.'
import TextInput from '../TextInput'

const FIELDS = [
  { name: 'Paris', country: 'France' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Madrid', country: 'Spain' }
]

const DEFAULT_FIELD = { name: '', country: '' }

const Context = React.createContext({ onChange: (value, name) => null })

const Container = styled.div`
  width: 600px;
`

const InputContainer = styled.div`
  padding-bottom: 16px;
`

const CountryArrayInputElement = ({ value, index }) => (
  <Context.Consumer>
    {({ onChange }) => (
      <React.Fragment>
        <InputContainer>
          <TextInput
            value={value.name}
            onChange={name => onChange({ ...value, name }, index)}
            label='City'
          />
        </InputContainer>
        <InputContainer>
          <TextInput
            value={value.country}
            onChange={country => onChange({ ...value, country }, index)}
            label='Country'
          />
        </InputContainer>
      </React.Fragment>
    )}
  </Context.Consumer>
)

class CountryArrayInput extends React.Component<any, any> {
  state = {
    items: FIELDS
  }

  handleChange = (value, index) => this.setState(({ items }) => ({
    items: [...take(items, index), value, ...takeRight(items, items.length - index - 1)]
  }))

  handleAppend = () => this.setState(({ items }) => ({ items: [...items, DEFAULT_FIELD] }))

  handleDelete = index => this.setState(({ items }) => ({
    items: [...take(items, index), ...takeRight(items, items.length - index - 1)]
  }))

  handleReorder = (oldPosition, newPosition) => this.setState(prevState => {
    const items = clone(prevState.items)
    items.splice(newPosition > oldPosition ? newPosition + 1 : newPosition, 0, items[oldPosition])
    items.splice(newPosition > oldPosition ? oldPosition : oldPosition + 1, 1)

    return { items }
  })

  render () {
    const { items } = this.state

    return (
      <Container>
        <Context.Provider value={{ onChange: this.handleChange }}>
          <ArrayInput
            items={items}
            onAppend={this.handleAppend}
            onDelete={this.handleDelete}
            onReorder={this.handleReorder}
            itemComponent={CountryArrayInputElement}
            {...this.props}
          />
        </Context.Provider>
      </Container>
    )
  }
}

const ItemTitle = ({ value }) => (value.name ? `${value.name} (${value.country})` : 'Empty element')

const ItemTitleSimple = ({ value }) => value.name

const ItemDescription = ({ value }) => `Country: ${value.country}`

storiesOf('Inputs/ArrayInput', module)
  .add('basic', () => (
    <CountryArrayInput
      itemTitleComponent={ItemTitle}
    />
  ))
  .add('with description line', () => (
    <CountryArrayInput
      itemTitleComponent={ItemTitleSimple}
      itemDescriptionComponent={ItemDescription}
    />
  ))
  .add('with order change allowed', () => (
    <CountryArrayInput
      itemTitleComponent={ItemTitle}
      canBeReordered
    />
  ))
  .add('with add button custom label', () => (
    <CountryArrayInput
      itemTitleComponent={ItemTitle}
      addButtonLabel='Add a city'
    />
  ))
