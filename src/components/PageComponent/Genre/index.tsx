import React from 'react'
import { useProps } from './useProps'
import { Layout } from './Layout'

type Props = {
  selectGenre: Genre[]
  toggleGenre: (genre: Genre) => void
}

export const Genre = (props: Props) => <Layout {...useProps(props)} />
