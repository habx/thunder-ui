export const ssrDOMRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  toJSON: () => null,
}

export const isClientSide: boolean = typeof document === 'object'
