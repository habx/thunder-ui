export type formOption = { value: any, label: string }

export type formValue = formOption | string | number

export type thunderContext = {
  query: string,
  data: any
}
