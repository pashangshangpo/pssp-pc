/**
 * @file 
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: 
   *  props
   */
  static defaultProps = {
    className: '',
    data: []
  }

  componentWillMount() {
    // 校验的状态
    this.validateState = new Map()
  }

  // 外部校验接口
  validate = () => {
    return Array.from(this.validateState.values()).every(state => !!state)
  }

  types = {
    inputText: (rule, props) => {
      const key = `${Date.now()}-${this.validateState.size}`
      const onKeyDown = props.onKeyDown || (() => {})
      const onChange = props.onChange || (() => {})

      props.onKeyDown = e => {
        const len = rule.len
        if (len != undefined) {
          const value = e.currentTarget.value
          if (value.length > len - 1 && e.keyCode !== 8 && !e.metaKey) {
            e.preventDefault()
          }
        }

        onKeyDown(e)
      }

      props.onChange = e => {
        const len = rule.len
        if (len != undefined) {
          const value = e.currentTarget.value
          if (value.length > len) {
            this.validateState.set(`inputText-${key}`, false)
            console.log('输入过长')
          }
          else {
            this.validateState.set(`inputText-${key}`, true)
          }
        }
        onChange(e)
      }
    }
  }

  renderMain = () => {
    return this.props.data.map(item => {
      const type = this.types[item.type]
      type && type(item.rule, item.content.props)

      return el(
        'div',
        {
          className: 'item'
        },
        el(
          'label',
          {},
          item.name
        ),
        item.content
      )
    })
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'form'
        })
      },
      this.renderMain()
    )
  }
}
