const API_ROOT = 'https://www.habx.fr/api/images/'

export const listImages = directory => fetch(`${API_ROOT}${directory}`)
