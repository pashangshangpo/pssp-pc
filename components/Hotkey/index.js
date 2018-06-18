/**
 * @file Hotkey
 * @author pashangshangpo
 * @createTime 2018年4月29日 下午4:09
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class Hotkey extends Component {
  /**
   * @def-start: Hotkey: props => Hotkey
   *  props: Object
   *    event: Object
   *      *: (key, event) => undefined *是要匹配的键 值是匹配时执行的方法
   *  children: Array => ReactElement
   * 
   * 支持的组合键: meta ctrl alt shift
   * 使用方法: meta+a
   * 
   * 常用键: delete return esc space left right up down
   * 
   * 如需要同时使用多个,用空格隔开,如: meta+up meta+i
   * 
   * 如果要使用此处未支持的键则使用keyCode作为键
   */
  static defaultProps = {
    event: {}
  }

  static combinationkeys = [
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
    }
  ]

  static commonKeys = [
    {
      name: 'delete',
      keyCode: 8
    },
    {
      name: 'return',
      keyCode: 13
    },
    {
      name: 'esc',
      keyCode: 27
    },
    {
      name: 'space',
      keyCode: 32
    },
    {
      name: 'left',
      keyCode: 37
    },
    {
      name: 'up',
      keyCode: 38
    },
    {
      name: 'right',
      keyCode: 39
    },
    {
      name: 'down',
      keyCode: 40
    }
  ]

  un = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    this.un()
  }

  handleKeyDown = e => {
    // 如果没有children则当做全局事件来处理
    if (e.target === this.dom || this.props.children.length === 0) {
      this.processEvent(this.combination(e), e)
    }
  }

  combination = e => {
    const current = Hotkey.combinationkeys.find(item => e[item.key] && e.keyCode !== item.keyCode)
    const currentKey = Hotkey.commonKeys.find(item => e.keyCode === item.keyCode)
    
    if (current) {
      let key = `${current.name}+${e.keyCode} ${current.name}+${e.key}`

      if (currentKey) {
        return `${key} ${current.name}+${currentKey.name}`
      }

      return key
    }

    if (currentKey) {
      return `${currentKey.name} ${e.keyCode} ${e.key}`
    }

    return `${e.keyCode} ${e.key}`
  }

  processEvent = (key, e) => {
    const keys = key.split(' ')
    
    for (let name of keys) {
      const eventKeys = Object.keys(this.props.event)

      for (let eventKey of eventKeys) {
        if (eventKey.split(' ').some(item => item === name)) {
          this.props.event[eventKey](key, e)
          return
        }
      }
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
