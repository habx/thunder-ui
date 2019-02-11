import * as React from 'react'

export default interface HeaderProps {
  goTo: (page: string) => void,
  title: string,
  onUploadImages: (e: React.FormEvent<HTMLInputElement>) => void
  status: string
}
