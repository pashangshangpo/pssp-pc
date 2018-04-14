/**
 * @file Form
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: 
   *  props: Object
   *    data: Array => Item
   *      Item: Object
   *        state: 0,1,2 0:未填写 1:填写错误 2: 正确
   */
  static defaultProps = {
    className: '',
    messageDirection: 'bottom',
    data: []
  }

  state = {
    validateList: this.props.data
  }

  componentWillMount() {
  }

  // 外部校验接口
  validate = () => {
    return this.state.validateList.every(item => item.validateState !== 2 || item.validateState == undefined)
  }

  types = {
    inputText: (item, props) => {
      const rule = item.rule
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
          const current = this.state.validateList.find(validateItem => validateItem === item)

          if (value.length > len) {
            current.validateState = 1
          }
          else {
            current.validateState = 2
          }

          this.setState(this.state.validateList)
        }
        onChange(e)
      }
    }
  }

  renderMessage = (direction, item) => {
    if (this.props.messageDirection !== direction || item.validateState == undefined) {
      return null
    }
    else if (item.validateState === 0) {
      return el(
        'div',
        {
          className: `message-${direction}`
        },
        item.rule.requireMessage
      )
    }
    else if (item.validateState === 1) {
      return el(
        'div',
        {
          className: `message-${direction}`
        },
        item.rule.errorMessage
      )
    }
  }

  renderMain = () => {
    return this.state.validateList.map(item => {
      const type = this.types[item.type]
      type && type(item, item.content.props)

      return el(
        'div',
        {
          className: 'item'
        },
        el(
          'div',
          {
            className: 'main'
          },
          el(
            'label',
            {},
            item.name
          ),
          el(
            'div',
            {
              className: c({
                default: {
                  value: true,
                  error: item.validateState === 0 || item.validateState === 1
                }
              })
            },
            item.content,
            this.renderMessage('bottom', item)
          ),
          this.renderMessage('right', item)
        )
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
