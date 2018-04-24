/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Base from './Base'
import Confirm from './Confirm'
import { el, c, render } from '../../common'

export default class Modal extends Component {
  static confirm = config => render({
    component: el(
      Confirm,
      config
    )
  })

  componentDidMount() {
    this.appendToBody()
  }

  componentDidUpdate() {
    this.appendToBody()
  }

  componentWillUnmount() {
    this.container.destroy()
  }

  appendToBody = () => {
    this.container = render({
      context: this,
      component: el(
        Base, 
        this.props,
        this.props.children
      ),
      container: this.container && this.container.getEl()
    })
  }

  render() {
    return null
  }
}

window.Modal = Modal
