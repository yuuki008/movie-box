import React from 'react'
import { useProps } from './useProps'
import { Layout } from './Layout'

type Props = {
  folder: Folder
}
export const FolderMovie = (props: Props) => <Layout {...useProps(props)} />
