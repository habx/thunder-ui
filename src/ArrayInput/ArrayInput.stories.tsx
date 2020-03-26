import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import TextInput from '../TextInput'

import ArrayInput from './index'

type field = { name: string; country: string }
const FIELDS = [
  { name: 'Paris', country: 'France' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Madrid', country: 'Spain' },
]

const DEFAULT_FIELD = { name: '', country: '' }

const Context = React.createContext({
  onChange: (_value, _index) => {},
})

const Container = styled.div`
  width: 600px;
`

const InputContainer = styled.div`
  padding-bottom: 16px;
`

const CountryArrayInputElement = ({
  value,
  index,
}: {
  value: field
  index: number
}) => (
  <Context.Consumer>
    {({ onChange }) => (
      <React.Fragment>
        <InputContainer>
          <TextInput
            value={value.name}
            onChange={name =>
              onChange({ ...value, name: name as string }, index)
            }
            label="City"
          />
        </InputContainer>
        <InputContainer>
          <TextInput
            value={value.country}
            onChange={country =>
              onChange({ ...value, country: country as string }, index)
            }
            label="Country"
          />
        </InputContainer>
      </React.Fragment>
    )}
  </Context.Consumer>
)

const CountryArrayInput: React.FunctionComponent<any> = props => {
  const [items, setItems] = React.useState(FIELDS)

  const handleChange = (value: field, index: number) =>
    setItems(prev => [...prev.slice(0, index), value, ...prev.slice(index + 1)])

  const handleAppend = () => setItems(prev => [...prev, DEFAULT_FIELD])

  const handleDelete = (index: number) =>
    setItems(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])

  const handleReorder = (oldPosition: number, newPosition: number) => {
    setItems(prev => {
      const newItems = [...prev]

      newItems.splice(
        newPosition > oldPosition ? newPosition + 1 : newPosition,
        0,
        newItems[oldPosition]
      )
      newItems.splice(
        newPosition > oldPosition ? oldPosition : oldPosition + 1,
        1
      )

      return newItems
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

const ItemTitle: React.FunctionComponent<any> = ({ value }) => (
  <React.Fragment>
    {value.name ? `${value.name} (${value.country})` : 'Empty element'}
  </React.Fragment>
)

const ItemMultiLineTitle: React.FunctionComponent<any> = ({ value }) => (
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
