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
    onClose: () => {}
  }

  static footer = ''

  state = {
    visible: this.props.visible
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  componentWillMount() {
    this.initFooter()
  }

  componentDidMount() {
    this.forbiddenScroll()
  }

  handleClose = () => {
    this.close()
  }

  handleOk = () => {
    this.close()
  }

  initFooter = () => {
    Modal.footer = this.props.footer || el(
      'div',
      {
        className: 'btns'
      },
      el(
        Button,
        {
          onClick: this.handleClose
        },
        'Cancel'
      ),
      el(
        Button,
        {
          type: 'primary',
          onClick: this.handleOk
        },
        'OK'
      )
    )
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
        Modal.footer
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
