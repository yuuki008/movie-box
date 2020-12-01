import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

type Params = {
  movie: Movie
  favorites: Movie[]
}

export const Favorite = (params: Params) => <Layout {...useProps(params)} />
