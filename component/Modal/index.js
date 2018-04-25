/**
 * @file Modal组件入口
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
import Confirm from './Confirm'
import Info from './Info'
import Success from './Success'
import Error from './Error'
import Warning from './Warning'
import { el, c, render } from '../../common'

export default class extends Component {
  static confirm = config => render({
    component: el(
      Confirm,
      config
    )
  })

  static info = config => render({
    component: el(
      Info,
      config
    )
  })

  static success = config => render({
    component: el(
      Success,
      config
    )
  })

  static error = config => render({
    component: el(
      Error,
      config
    )
  })

  static warning = config => render({
    component: el(
      Warning,
      config
    )
  })

  componentWillMount() {
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
  }

  render() {
    return ReactDOM.createPortal(
      el(
        Modal,
        this.props,
        this.props.children
      ),
      this.container
    )
  }
}
