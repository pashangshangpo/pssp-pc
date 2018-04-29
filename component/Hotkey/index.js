/**
 * @file Hotkey
 * @author pashangshangpo
 * @createTime 2018年4月29日 下午4:09
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Hotkey: props => Hotkey
   *  props: Object
   */
  static defaultProps = {
    event: {}
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    console.log(e.target === this.dom)
    if (this.props.children.length === 0) {
      console.log('not children')
    }
  }

  render() {
    if (this.props.children.length === 0) {
      return null
    }

    return el(
      'div',
      {
        tabindex: -1,
        ref: ref => this.dom = ref,
        className: c({
          prefix: 'hotkey'
        })
      },
      this.props.children
    )
  }
}
