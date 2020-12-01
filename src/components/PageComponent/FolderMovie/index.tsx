import React from 'react'
import { useProps } from './useProps'
import { Layout } from './Layout'

type Params = {
  folder: Folder
}
export const FolderMovie = (Params: Params) => <Layout {...useProps(Params)} />
