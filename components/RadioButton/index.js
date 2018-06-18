/**
 * @file 单选按钮
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import Button from '../Button'
import './index.less'

export default class extends Component {
  /**
   * @def-start: RadioButton: props => RadioButton
   *  props: Object
   *    className: String
   *    checked: * 选中项 Button.value
   *    data: Array => Object as Button
   *      Button: {value: 'AAA'} value会被当成内容
   *    onChange: button => * 准备更改时执行, 返回false不会被选中
   */
  static defaultProps = {
    className: '',
    checked: '',
    data: [],
    onChange: button => {}
  }

  state = {
    checked: this.props.checked
  }

  handleButtonClick = button => {
    if (button.value !== this.state.checked && this.props.onChange(button) !== false) {
      this.state.checked = button.value
      this.setState(this.state)
    }
  }

  renderMain = () => {
    return this.props.data.map(button => {
      return el(
        'div',
        {
          className: c({
            default: {
              button: true,
              checked: this.state.checked === button.value
            }
          }),
          onClick: this.handleButtonClick.bind(this, button)
        },
        button.value
      )
    })
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'radio-button'
        })
      },
      this.renderMain()
    )
  }
}
