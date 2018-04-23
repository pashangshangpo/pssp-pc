/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
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
    header: '',
    main: '',
    footer: '',
    visible: false,
    closable: true,
    maskClosable: false,
    onClose: () => {}
  }

  state = {
    visible: this.props.visible
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
        }
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
