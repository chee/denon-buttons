import React, {PureComponent} from 'react'
import './index.css'

export default class Button extends PureComponent {
  render () {
    const {
      isActive,
      children,
      ...props
    } = this.props

    return (
      <button
        {...props}
        className={`button ${isActive ? 'is-active' : ''}`}>
        {children}
      </button>
    )
  }
}
