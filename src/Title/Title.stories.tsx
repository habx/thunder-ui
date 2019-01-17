import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Title from '.'

import colors from '../colors'

storiesOf('Typography/Title/h1 (size = 1)', module)
  .add('basic', () => <Title>This is a title</Title>)
  .add('with manual color', () => <Title color={colors.paynesGrey}>This is a title</Title>)
  .add('with underline', () => <Title underline>This is a title</Title>)

storiesOf('Typography/Title/h2 (size = 2)', module)
  .add('basic', () => <Title size={2}>This is a title</Title>)
  .add('with manual color', () => <Title color={colors.paynesGrey} size={2}>This is a title</Title>)
  .add('with underline', () => <Title underline size={2}>This is a title</Title>)

storiesOf('Typography/Title/h3 (size = 3)', module)
  .add('basic', () => <Title size={3}>This is a title</Title>)
  .add('with manual color', () => <Title color={colors.paynesGrey} size={3}>This is a title</Title>)
