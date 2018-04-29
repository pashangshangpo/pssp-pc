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
    // 如果没有children则当做全局事件来处理
    if (e.target === this.dom || this.props.children.length === 0) {
      console.log(this.combination(e))
    }
  }

  combination = e => {
    const keys = [
      {
        name: 'meta',
        key: 'metaKey',
        keyCode: 91
      },
      {
        name: 'ctrl',
        key: 'ctrlKey',
        keyCode: 17
      },
      {
        name: 'alt',
        key: 'altKey',
        keyCode: 18
      },
      {
        name: 'shift',
        key: 'shiftKey',
        keyCode: 16
      }]

    const current = keys.find(item => e[item.key] && e.keyCode !== item.keyCode)
    
    if (current) {
      return `${current.name}+${e.keyCode}`
    }
    
    return e.keyCode
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
