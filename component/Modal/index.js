/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import Svg from '../Svg'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
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
    footer: 'footer',
    visible: false,
    closable: true,
    maskClosable: false,
    onClose: () => {}
  }

  state = {
    visible: this.props.visible
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

  handleClose = () => {
    this.close()
  }

  close = () => {
    this.changeState({
      visible: false
    })

    this.forbiddenScroll()
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

  renderModal = () => {
    return el(
      'div',
      {},
      el(
        'div',
        {
          className: 'header'
        },
        el(
          Svg,
          {
            icon: require('../../image/icon-delete.svg'),
            className: 'close',
            onClick: this.handleClose
          }
        ),
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
        this.props.footer
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
