import React from 'react'
import PropTypes from 'prop-types'
import { PWALayoutContainer } from './PWALayout.styled'

const PWALayout = props => {
  return (
    <PWALayoutContainer>
        {props?.children}
    </PWALayoutContainer>
  )
}

PWALayout.propTypes = {
    children: PropTypes.node,
}

export default PWALayout
