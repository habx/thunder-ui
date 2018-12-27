export type formOption = { value: number | string, label: string }

export type formValue = formOption | string | number

export type thunderContext = {
  query: string,
  data: any
}
