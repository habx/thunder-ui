import * as React from 'react'

import SliderProps from './Slider.interface'
import { SliderContainer, SliderBar } from './Slider.style'
import SliderDot from './SliderDot'

const Slider: React.FunctionComponent<SliderProps> = ({
  range,
  value,
  onChange,
  min,
  max,
  ...props
}) => {
  const barRef = React.useRef(null)

  const getBarWidth = () => barRef.current.offsetWidth

  const [localValue, setLocalValue] = React.useState(
    value === null ? (range ? [min, max] : min) : value
  )

  const handleChange = React.useCallback(() => {
    if (value !== localValue) {
      onChange(localValue)
    }
  }, [localValue, onChange, value])

  const valueButtons = React.useMemo(
    () => <SliderDot min={min} max={max} value={value} getBarWidth={getBarWidth} />,
    [max, min, value]
  )

  return (
    <SliderContainer {...props}>
      <SliderBar ref={barRef} />
      {valueButtons}
    </SliderContainer>
  )
}

Slider.defaultProps = {
  labelFormatter: label => label,
  range: false,
  customValues: null,
  value: null,
  toolTipSuffix: '',
  min: 0,
  max: 100,
  step: 5,
  indicators: [],
}

export default Slider
