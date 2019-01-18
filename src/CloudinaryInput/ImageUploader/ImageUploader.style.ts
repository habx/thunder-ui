import styled from 'styled-components'

import shadows from '../../shadows'
import colors from '../../colors'
import Modal from '../../Modal'

export const ImageUploaderContainer = styled(Modal)`
  padding: 0;
  max-width: 1000px;
  width: 1000px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`

export const Content = styled.div`
  flex: 1 1 100%;
  background-color: ${colors.whiteSmoke};
  position: relative;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  &[data-page="customizer"] {
    overflow: hidden;
  }
`

export const ImageList = styled.div`
  position: relative;
  margin: 32px 0;
  flex: 1 1 100%;
  display: flex;
  flex-wrap: wrap;

  &[data-loading="true"] {
    align-items: center;
    justify-content: center;
  }
`

export const ImageContainer = styled.div`
  flex: 0 0 33%;
  box-sizing: border-box;
  padding: 16px;

  img {
    width: 100%;
    transition: box-shadow, opacity 150ms ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: ${shadows.strong};
    }

    &[data-fade="true"] {
      opacity: 0.5;
      filter: grayscale();
    }
  }
`

export const Directories = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 32px 0;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const Directory = styled.li`
  display: flex;
  align-items: center;

  height: 48px;
  line-height: 48px;
  padding: 0 16px;
  transition: background-color 150ms ease-in-out;
  cursor: pointer;
  color: ${colors.paynesGrey};

  &:hover {
    background-color: ${colors.snow};
  }
`

export const DirectoryContent = styled.div`
  padding-left: 16px;
`

export const ActionBarContainer = styled.div`
  flex: 0 0 48px;
  background-color: ${colors.white};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 32px;

  > * {
    margin-left: 16px;
  }
`
