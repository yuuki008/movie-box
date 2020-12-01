import React from 'react'
import { useProps } from './useProps'
import { Layout } from './Layout'

type Params = {
  selectGenre: Genre[]
  toggleGenre: (genre: Genre) => void
}

export const Genre = (params: Params) => <Layout {...useProps(params)} />
