import * as React from 'react'
import { createGlobalStyle } from 'styled-components'

const Fonts = createGlobalStyle`
  * {
    font-family: EuclidCircularB;
  }

  @font-face {
    font-family: "Inter UI";
    font-style: normal;
    font-weight: 500;
    src: url("fonts/Inter UI/Inter-UI-Regular.otf") format("opentype");
  }

  @font-face {
    font-family: "Inter UI";
    font-style: normal;
    font-weight: 600;
    src: url("fonts/Inter UI/Inter-UI-SemiBold.otf") format("opentype");
  }

  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url("fonts/material/MaterialIcons-Regular.eot"); /* For IE6-8 */
    src: local('Material Icons'),
      local('MaterialIcons-Regular'),
      url("fonts/material/MaterialIcons-Regular.woff2") format('woff2'),
      url("fonts/material/MaterialIcons-Regular.woff") format('woff'),
      url("fonts/material/MaterialIcons-Regular.ttf") format('truetype');
  }

  @font-face {
    font-family: "Habx";
    font-style: italic;
    font-weight: bold;
    src: url("fonts/Habx/Habx-Regular.eot") format("eot"),
      url("fonts/Habx/Habx-Regular.woff2") format("woff2"),
      url("fonts/Habx/Habx-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "EuclidCircularB";
    font-style: normal;
    font-weight: bold;
    src: url("fonts/EuclidCircularB/EuclidCircularB-Bold.otf") format("opentype");
  }

  @font-face {
    font-family: "EuclidCircularB";
    font-style: normal;
    font-weight: '300';
    src: url("fonts/EuclidCircularB/EuclidCircularB-Light.otf") format("opentype");
  }

  @font-face {
    font-family: "EuclidCircularB";
    font-style: normal;
    font-weight: '500';
    src: url("fonts/EuclidCircularB/EuclidCircularB-Medium.otf") format("opentype");
  }

  @font-face {
    font-family: "EuclidCircularB";
    font-style: normal;
    font-weight: '600';
    src: url("fonts/EuclidCircularB/EuclidCircularB-Semibold.otf") format("opentype");
  }

  @font-face {
    font-family: "EuclidCircularB";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/EuclidCircularB/EuclidCircularB.otf") format("opentype");
  }
`

const fontDecorator = storyFn => (
  <React.Fragment>
    { storyFn() }
    <Fonts />
  </React.Fragment>
)

export default fontDecorator
