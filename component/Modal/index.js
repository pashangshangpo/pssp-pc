/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
import Confirm from './Confirm'
import { el, c, render } from '../../common'

export default class Base extends Component {
  static confirm = config => render({
    component: el(
      Confirm,
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

window.Modal = Base
