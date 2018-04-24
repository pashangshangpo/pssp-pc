/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Base from './Base'
import { el, c } from '../../common'

export default class Modal extends Component {
  static createContainer = () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    return div
  }

  static confirm = config => {
    // const { title, content, onOk, onCancel } = config
    let element = null

    ReactDOM.render(
      el(
        'div',
        {
          ref: ref => element = ref.parentNode
        },
        '123123123'
      ),
      Modal.createContainer()
    )

    return {
      destroy: () => {
        if (element) {
          ReactDOM.unmountComponentAtNode(element)
          document.body.removeChild(element)
          element = null
        }
      }
    }
  }

  componentDidMount() {
    this.container = Modal.createContainer()
    this.appendToBody()
  }

  componentDidUpdate() {
    this.appendToBody()
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.container)
    document.body.removeChild(this.container)
  }

  appendToBody = () => {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, 
      el(Base, this.props, this.props.children),
      this.container
    )
  }

  render() {
    return null
  }
}
