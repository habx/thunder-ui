import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Tabs, { TabsSection, TabsItem, TabsSeparator } from '.'

storiesOf('Navigation/Tabs', module)
  .add('default', () => (
    <Tabs>
      <TabsItem>Documents</TabsItem>
      <TabsItem active>Infos</TabsItem>
      <TabsItem>Echanges</TabsItem>
      <TabsItem>Activités</TabsItem>
      <TabsItem>Documents</TabsItem>
    </Tabs>
  ))
  .add('with sections', () => (
    <Tabs>
      <TabsSection label='Contact'>
        <TabsItem>Documents</TabsItem>
        <TabsItem active>Infos</TabsItem>
        <TabsItem>Echanges</TabsItem>
        <TabsItem>Activités</TabsItem>
        <TabsItem>Documents</TabsItem>
      </TabsSection>
      <TabsSection label='Candidatures'>
        <TabsItem>Zelmis</TabsItem>
        <TabsItem active>Groslay</TabsItem>
      </TabsSection>
    </Tabs>
  ))
  .add('with separators', () => (
    <Tabs>
      <TabsSection label='Contact'>
        <TabsItem>Documents</TabsItem>
        <TabsItem active>Infos</TabsItem>
        <TabsSeparator />
        <TabsItem>Echanges</TabsItem>
        <TabsItem>Activités</TabsItem>
        <TabsItem>Documents</TabsItem>
        <TabsSeparator />
      </TabsSection>
      <TabsSection label='Candidatures'>
        <TabsItem>Zelmis</TabsItem>
        <TabsSeparator />
        <TabsItem active>Groslay</TabsItem>
      </TabsSection>
    </Tabs>
  ))
  .add('customized', () => (
    <Tabs hoverColor='red' activeColor='red' color='green'>
      <TabsSection label='Contact' labelColor='yellow'>
        <TabsItem>Merry</TabsItem>
        <TabsItem active>Christmas</TabsItem>
      </TabsSection>
      <TabsSection label='Candidatures' labelColor='yellow'>
        <TabsItem>Happy</TabsItem>
        <TabsItem active>New</TabsItem>
        <TabsItem>Year</TabsItem>
      </TabsSection>
    </Tabs>
  ))
  .add('with scroll', () => (
    <Tabs>
      <TabsSection label='Contact' style={{ maxWidth: 200 }}>
        <TabsItem>Documents</TabsItem>
        <TabsItem active>Infos</TabsItem>
        <TabsSeparator />
        <TabsItem>Echanges</TabsItem>
        <TabsItem>Activités</TabsItem>
        <TabsItem>Documents</TabsItem>
        <TabsSeparator />
      </TabsSection>
      <TabsSection label='Candidatures'>
        <TabsItem>Zelmis</TabsItem>
        <TabsSeparator />
        <TabsItem active>Groslay</TabsItem>
      </TabsSection>
    </Tabs>
  ))
