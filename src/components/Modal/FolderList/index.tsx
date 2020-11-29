import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

type Props = {
  movie: Movie
}
export const FolderList = (props: Props) => <Layout {...useProps(props)} />
