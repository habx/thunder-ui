import * as React from 'react'
import styled from 'styled-components'

import Title from '../Title'

interface StorybookGalleryProps {
  renderLine: (props: { [key: string]: any }) => React.ReactElement
  lines: { title: string; props: { [key: string]: any } }[]
}

const StorybookGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
`

const StorybookGalleryLine = styled.div``

const StorybookGalleryLineContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px -12px 32px -12px;

  & > * {
    margin: 8px 12px !important;
  }
`

const StorybookGallery: React.FunctionComponent<StorybookGalleryProps> = ({
  lines,
  renderLine,
}) => (
  <StorybookGalleryContainer>
    {lines.map(({ title, props }) => (
      <StorybookGalleryLine>
        <Title size={3}>{title}</Title>
        <StorybookGalleryLineContent>
          {renderLine(props)}
        </StorybookGalleryLineContent>
      </StorybookGalleryLine>
    ))}
  </StorybookGalleryContainer>
)

export default StorybookGallery
