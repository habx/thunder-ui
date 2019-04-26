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

# using yarn like the cool kids out there
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

#### Find what you want at the speed of light with spotlight ⚡
Pressing shift twice displays the spotlight. You can then search in your data and have a quick access to anywhere in your app 🚀

Look at the storybook to learn how to use and customize it ! 

<p align="center" style="margin: 0 20%">
  <img src="https://res.cloudinary.com/habx/image/upload/v1556272939/tech/thunder-ui/spotlight.gif" />
</p>

Every single component is detailed in the [Storybook](https://habx.github.io/thunder-ui).

## TODO

- [ ] Make the ArrayInput component responsive
- [ ] Make the Notification component responsive
- [ ] Provide some code examples
- [ ] Provide a few default themes

