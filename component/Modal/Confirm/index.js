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
   * @def-start: Confirm: props => Confirm
   *  props: Object
   *    className: String
   *    style: Object
   *    title: [ReactElement, String] 标题
   *    content: [ReactElement, String] 内容
   *    okText: String 确认按钮文案
   *    cancelText: String 取消按钮文案
   *    showOk: Boolean 是否显示确认按钮
   *    showCancel: Boolean 是否显示取消按钮
   *    onOk: Function 确认事件
   *    onCancel: Function 取消事件
   */
  static defaultProps = {
    className: '',
    style: {},
    title: '',
    content: '',
    okText: 'OK',
    cancelText: 'Cancel',
    showOk: true,
    showCancel: true,
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
    if (!this.state.loading) {
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

  renderBtnCancel = () => {
    if (!this.props.showCancel) {
      return null
    }

    return el(
      Button,
      {
        onClick: this.handleCancel
      },
      this.props.cancelText
    )
  }

  renderBtnOk = () => {
    if (!this.props.showOk) {
      return null
    }
    
    return el(
      Button,
      {
        type: 'primary',
        loading: this.state.loading,
        onClick: this.handleOk
      },
      this.props.okText
    )
  }

  renderBtns = () => {
    if (!this.props.showOk && !this.props.showCancel) {
      return null
    }

    return el(
      'div',
      {
        className: 'btns'
      },
      this.renderBtnCancel(),
      this.renderBtnOk()
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
        style: this.props.style,
        header: null,
        footer: null,
        visible: true,
        main: this.renderMain()
      }
    )
  }
}
