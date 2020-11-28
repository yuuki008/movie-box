import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

export const MyList = () => <Layout {...useProps()} />
