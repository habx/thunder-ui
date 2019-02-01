const KEY_PREFIX = 'thunder.'

export const getItems = key => JSON.parse(window.localStorage.getItem(`${KEY_PREFIX}${key}`))

export const setItems = key => item => window.localStorage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(item))

export const upsertItem = key => (itemKey, item) =>
  setItems(key)({
    ...getItems(key),
    [itemKey]: item
  })

export const deleteItem = key => itemKey => {
  const items = getItems(key)
  delete items[itemKey]
  setItems(key)(items)
}
