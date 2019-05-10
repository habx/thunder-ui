export default interface SliderDotProps {
  position: number
  onMove: (deltaPixel: number) => void
  labelFormatter?: (label) => string
}
