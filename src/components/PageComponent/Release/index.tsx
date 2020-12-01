import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

type Params = {
  movie: Movie
  notifications: Movie[]
}
export const Release = (params: Params) => <Layout {...useProps(params)} />
