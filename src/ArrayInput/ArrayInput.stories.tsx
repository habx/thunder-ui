import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import TextInput from '../TextInput'

import ArrayInput from './index'

const FIELDS = [
  { name: 'Paris', country: 'France' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Madrid', country: 'Spain' },
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
            label="City"
          />
        </InputContainer>
        <InputContainer>
          <TextInput
            value={value.country}
            onChange={country => onChange({ ...value, country }, index)}
            label="Country"
          />
        </InputContainer>
      </React.Fragment>
    )}
  </Context.Consumer>
)

const CountryArrayInput: React.StatelessComponent<any> = props => {
  const [items, setItems] = React.useState(FIELDS)

  const handleChange = (value, index) =>
    setItems(prev => [...prev.slice(0, index), value, ...prev.slice(index + 1)])

  const handleAppend = () => setItems(prev => [...prev, DEFAULT_FIELD])

  const handleDelete = index =>
    setItems(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])

  const handleReorder = (oldPosition, newPosition) => {
    setItems(prev => {
      const items = [...prev]

      items.splice(
        newPosition > oldPosition ? newPosition + 1 : newPosition,
        0,
        items[oldPosition]
      )
      items.splice(newPosition > oldPosition ? oldPosition : oldPosition + 1, 1)

      return items
    })
  }

  return (
    <Container>
      <Context.Provider value={{ onChange: handleChange }}>
        <ArrayInput
          items={items}
          onAppend={handleAppend}
          onDelete={handleDelete}
          onReorder={handleReorder}
          itemComponent={CountryArrayInputElement}
          itemTitleComponent={ItemTitle}
          {...props}
        />
      </Context.Provider>
    </Container>
  )
}

const ItemTitle: React.StatelessComponent<any> = ({ value }) => (
  <React.Fragment>
    {value.name ? `${value.name} (${value.country})` : 'Empty element'}
  </React.Fragment>
)

const ItemMultiLineTitle: React.StatelessComponent<any> = ({ value }) => (
  <React.Fragment>
    <div>
      {value.name ? `${value.name} (${value.country})` : 'Empty element'}
    </div>
    <div>{`Country: ${value.country}`}</div>
  </React.Fragment>
)

storiesOf('Inputs|ArrayInput', module)
  .add('basic', () => <CountryArrayInput itemTitleComponent={ItemTitle} />)
  .add('disabled', () => (
    <CountryArrayInput itemTitleComponent={ItemTitle} disabled />
  ))
  .add('with multiline title', () => (
    <CountryArrayInput itemTitleComponent={ItemMultiLineTitle} />
  ))
  .add('with order change allowed', () => (
    <CountryArrayInput itemTitleComponent={ItemTitle} canBeReordered />
  ))
  .add('with add button custom label', () => (
    <CountryArrayInput
      itemTitleComponent={ItemTitle}
      addButtonLabel="Add a city"
    />
  ))
