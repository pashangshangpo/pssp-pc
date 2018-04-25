/**
 * @file Confirm
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../Modal'
import Button from '../../Button'
import Svg from '../../Svg'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: : props => 
   *  props: Object
   *    className: String
   */
  static defaultProps = {
    className: '',
    title: '',
    content: '',
    okText: 'OK',
    cancelText: 'Cancel',
    onOk: () => {},
    onCancel: () => {}
  }

  state = {
    loading: false
  }

  handleCancel = () => {
    this.destroy()
  }

  handleOk = () => {
    const promise = this.props.onOk()

    if (promise && promise.then) {
      this.changeState({
        loading: true
      })

      promise.then(() => {
        this.changeState({
          loading: false
        })

        this.destroy()
      })

      return
    }

    this.destroy()
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  destroy = () => {
    // 防止点击ok是异步的然后又点击了cancel
    if (!this.__destroy) {
      const container = ReactDOM.findDOMNode(this).parentNode

      this.__destroy = true

      container.parentNode.removeChild(container)
      ReactDOM.unmountComponentAtNode(container)
    }
  }

  renderIcon = () => {
    return el(
      Svg,
      {
        icon: require('../../../image/icon-confirm.svg')
      }
    )
  }

  renderTitle = () => {
    return el(
      'div',
      {
        className: 'title'
      },
      this.renderIcon(),
      el(
        'h3',
        {},
        this.props.title
      )
    )
  }

  renderContent = () => {
    return el(
      'div',
      {
        className: 'content'
      },
      this.props.content
    )
  }

  renderBtns = () => {
    return el(
      'div',
      {
        className: 'btns'
      },
      el(
        Button,
        {
          onClick: this.handleCancel
        },
        this.props.cancelText
      ),
      el(
        Button,
        {
          type: 'primary',
          loading: this.state.loading,
          onClick: this.handleOk
        },
        this.props.okText
      )
    )
  }

  renderMain = () => {
    return el(
      'div',
      {
        className: 'confirm-main'
      },
      this.renderTitle(),
      this.renderContent(),
      this.renderBtns()
    )
  }

  render() {
    return el(
      Modal,
      {
        className: c({
          default: this.props.className,
          prefix: 'confirm'
        }),
        header: null,
        footer: null,
        visible: true,
        main: this.renderMain()
      }
    )
  }
}
