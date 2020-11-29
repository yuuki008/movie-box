import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

type Props = {
  movie: Movie
  notifications: Movie[]
}
export const Release = (props: Props) => <Layout {...useProps(props)} />
