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

  handleClose = () => {
    console.log('close')
  }

  // 禁止滚动
  forbiddenScroll = () => {
    const init = document.body.style.overflow || 'initial'

    if (this.state.visible) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = init
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
    this.forbiddenScroll()

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
