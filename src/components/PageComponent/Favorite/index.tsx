import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

type Props = {
  movie: Movie
  favorites: Movie[]
}

export const Favorite = (props: Props) => <Layout {...useProps(props)} />
