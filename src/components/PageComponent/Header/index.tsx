import React from 'react'
import { Layout } from './Layout'
import { useProps } from './useProps'

export const Header = () => <Layout {...useProps()} />
