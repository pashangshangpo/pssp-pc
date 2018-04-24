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

  renderFooter = () => {
    return this.props.footer || el(
      'div',
      {
        className: 'btns'
      },
      el(
        Button,
        {
          onClick: this.handleCancel
        },
        'Cancel'
      ),
      el(
        Button,
        {
          type: 'primary',
          loading: this.state.confirmLoading,
          onClick: this.handleOk
        },
        'OK'
      )
    )
  }

  renderModal = () => {
    return el(
      'div',
      {},
      el(
        'div',
        {
          className: 'header'
        },
        this.renderClose(),
        this.props.header
      ),
      el(
        'div',
        {
          className: 'main'
        },
        this.props.main
      ),
      el(
        'div',
        {
          className: 'footer'
        },
        this.renderFooter()
      )
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
        style: this.props.style
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
