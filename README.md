<p align="center" style="font-size: 1.2rem;">
  <img src="https://res.cloudinary.com/habx/image/upload/v1556272989/tech/thunder-ui/thunder-ui.png" />
</p>


## What is it ?

Thunder UI contains all the [React](https://github.com/facebook/react) components we use to build our backoffice at [Habx](https://habx.fr). It provides a lot of ways to get your project started like theming.


## Installation

ThunderUI is available on [npm](https://www.npmjs.com/package/@habx/thunder-ui)


``` shell
# using npm
npm install @habx/thunder-ui

# using yarn
yarn add @habx/thunder-ui
```


## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@habx/thunder-ui'

const App = () => (
  <Card title='My first card'>
    Hello world
  </Card>
)

ReactDOM.render(<App />, document.querySelector('#app'));
```


## Documentation and examples

#### Thunder form

<p align="center">
  <img height="500" src="https://res.cloudinary.com/habx/image/upload/v1556284086/tech/thunder-ui/form_example.png" />
</p>

```js
  <Title underline>Form</Title>
  <Card title='Who are you ?' style={{ marginTop: 32 }}>
    <Container>
      <TextInput label='Your name' value='Bobby'/>
      <RadioSelect label='Your gender' options={[{ value: 1, label: 'Female' }, { value: 0, label: 'Male' }]} value={1} />
      <Slider label='Your age' value={23} onChange={() => null}/>
    </Container>
    <TextArea label='Your description' value='Lorem ipsum'/>
    <ButtonContainer>
      <Button>Validate</Button>
    </ButtonContainer>
  </Card>
```

#### Call a promise to confirm an action

<p align="center" style="margin: 0 20%">
  <img height="500" src="https://res.cloudinary.com/habx/image/upload/v1556284860/tech/thunder-ui/confirm.gif" />
</p>

```js
   <Button
      onClick={async () => {
        const response = await confirm('Voulez-vous continuer');
        action('Confirm Modal response')(response);
      }}
    >
      Trigger event
    </Button>
```


#### Find what you want at the speed of light with spotlight ⚡
Pressing shift twice displays the spotlight. You can then search in your data and have a quick access to anywhere in your app 🚀

Look at the storybook to learn how to use and customize it ! 

<p align="center" style="margin: 0 20%">
  <img height="500" src="https://res.cloudinary.com/habx/image/upload/v1556273749/tech/thunder-ui/spotlight.gif" />
</p>


#### Use a theme and customize thunder components as you like



<p align="center" style="margin: 0 20%">
  <img height="500" src="https://res.cloudinary.com/habx/image/upload/v1556274666/tech/thunder-ui/spotlight_dark.png" />
</p>




----------

Every single component is detailed in the [Storybook](https://habx.github.io/thunder-ui).

## TODO

- [ ] Make the ArrayInput component responsive
- [ ] Make the Notification component responsive
- [ ] Provide some code examples
- [ ] Provide a few default themes

