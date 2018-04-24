/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Svg from '../Svg'
import Button from '../Button'
import { el, c } from '../../common'
import './index.less'

class ModalBase extends Component {
  /**
   * @def-start: Modal: props => Modal
   *  props: Object
   *    className: String
   *    style: Object
   *    header: ReactElement, String 如果为null则不显示
   *    main: ReactElement, String
   *    footer: ReactElement, String 如果为null则不显示
   *    visible: Boolean 是否可见
   *    closable: Boolean 是否在右上角显示关闭按钮
   *    maskClosable: Boolean 点击遮罩层是否可关闭
   *    confirmLoading: Boolean 确认按钮是否loading中
   *    cancelText: String 取消按钮文案
   *    okText: String 确认按钮文案
   *    cancelType: String ['primary', 'default', 'dashed'] 取消按钮类型
   *    okType: String ['primary', 'default', 'dashed'] 确认按钮类型
   *    showCancel: Boolean 是否显示取消按钮
   *    showOk: Boolean 是否显示确认按钮
   *    onClose: Function 关闭模态框时触发
   *    onOk: Function 点击确认按钮时触发
   *    onCancel: Function 点击取消按钮时触发
   */
  static defaultProps = {
    className: '',
    style: {},
    header: 'title',
    main: 'main',
    footer: '',
    visible: false,
    closable: true,
    maskClosable: false,
    confirmLoading: false,
    cancelText: 'Cancel',
    okText: 'OK',
    cancelType: 'default',
    okType: 'primary',
    showCancel: true,
    showOk: true,
    onClose: () => { },
    onOk: () => { },
    onCancel: () => { }
  }

  state = {
    visible: this.props.visible,
    confirmLoading: this.props.confirmLoading
  }

  componentDidMount() {
    this.forbiddenScroll()
  }

  shouldComponentUpdate(next, pre) {
    if (next.confirmLoading !== pre.confirmLoading) {
      setTimeout(() => {
        this.changeState({
          confirmLoading: this.props.confirmLoading
        })

        if (!this.state.confirmLoading) {
          this.close()
        }
      })
    }

    return true
  }

  handleModalClick = e => {
    if (e.target === e.currentTarget && this.props.maskClosable) {
      this.close()
    }
  }

  handleClose = () => {
    this.close()
  }

  handleOk = () => {
    this.props.onOk()
  }

  handleCancel = () => {
    this.props.onCancel()
    this.close()
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  close = () => {
    this.changeState({
      visible: false
    })

    this.forbiddenScroll()
    this.props.onClose()
  }

  // 禁止滚动
  forbiddenScroll = () => {
    if (!this.__bodyOverflow) {
      this.__bodyOverflow = document.body.style.overflow || 'initial'
    }

    if (this.state.visible) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = this.__bodyOverflow
    }
  }

  renderClose = () => {
    if (!this.props.closable) {
      return null
    }

    return el(
      Svg,
      {
        icon: require('../../image/icon-delete.svg'),
        className: 'close',
        onClick: this.handleClose
      }
    )
  }

  renderModalHeader = () => {
    if (this.props.header === null) {
      return null
    }

    return el(
      'div',
      {
        className: 'header'
      },
      this.renderClose(),
      this.props.header
    )
  }

  renderModalMain = () => {
    return el(
      'div',
      {
        className: 'main'
      },
      this.props.main
    )
  }

  renderCancal = () => {
    if (!this.props.showCancel) {
      return null
    }

    return el(
      Button,
      {
        type: this.props.cancelType,
        onClick: this.handleCancel
      },
      this.props.cancelText
    )
  }

  renderOk = () => {
    if (!this.props.showOk) {
      return null
    }

    return el(
      Button,
      {
        type: this.props.okType,
        loading: this.state.confirmLoading,
        onClick: this.handleOk
      },
      this.props.okText
    )
  }

  renderModalFooter = () => {
    if (this.props.footer === null) {
      return null
    }

    return el(
      'div',
      {
        className: 'footer'
      },
      this.props.footer || el(
        'div',
        {
          className: 'btns'
        },
        this.renderCancal(),
        this.renderOk()
      )
    )
  }

  renderModal = () => {
    return el(
      'div',
      {},
      this.renderModalHeader(),
      this.renderModalMain(),
      this.renderModalFooter()
    )
  }

  renderMain = () => {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'modal'
        }),
        style: this.props.style,
        onClick: this.handleModalClick
      },
      el(
        'div',
        {
          className: 'box'
        },
        this.renderModal()
      )
    )
  }

  render() {
    return el(
      'div',
      {
        style: {
          display: this.state.visible ? 'block' : 'none'
        }
      },
      this.renderMain()
    )
  }
}

export default class Modal extends Component {
  componentDidMount() {
    this.container = document.createElement('div')
    document.body.appendChild(this.container)

    this.appendToBody()
  }

  componentDidUpdate() {
    this.appendToBody()
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }

  appendToBody = () => {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, 
      el(ModalBase, this.props, this.props.children),
      this.container
    )
  }

  render() {
    return null
  }
}
