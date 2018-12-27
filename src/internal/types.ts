type formOptionInterface = { value: number | string, label: string }
type formValue = formOptionInterface | string | number

type thunderContext = {
  query: string
  data: any
}
