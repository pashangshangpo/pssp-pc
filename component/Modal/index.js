/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import Svg from '../Svg'
import Button from '../Button'
import { el, c } from '../../common'
import './index.less'

export default class Modal extends Component {
  /**
   * @def-start: Modal: props => Modal
   *  props: Object
   *    className: String
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
    onClose: () => {},
    onOk: () => {},
    onCancel: () => {}
  }

  state = {
    visible: this.props.visible,
    confirmLoading: this.props.confirmLoading
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
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
        el(
          Button,
          {
            type: this.props.cancelType,
            onClick: this.handleCancel
          },
          this.props.cancelText
        ),
        el(
          Button,
          {
            type: this.props.okType,
            loading: this.state.confirmLoading,
            onClick: this.handleOk
          },
          this.props.okText
        )
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
