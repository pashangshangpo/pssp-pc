/**
 * @file AutoComplete
 * @author pashangshangpo
 * @createTime 2018年4月27日 上午9:24:39
 */

import React, { Component } from 'react'
import Input from '../Input'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: AutoComplete: props => AutoComplete
   *  props: Object
   *    className: String
   */
  static defaultProps = {
    className: '',
    style: {},
    placeholder: '',
    data: [],
    onChange: () => {},
    onSelect: () => {}
  }

  handleInputFocus = () => {

  }

  hanldeInputBlur = () => {

  }

  renderInput = () => {
    return el(
      Input,
      {
        type: 'text',
        placeholder: this.props.placeholder,
        onFocus: this.handleInputFocus,
        onBlur: this.hanldeInputBlur
      }
    )
  }

  renderSelect = () => {
    return el(
      'div',
      {
        className: 'select'
      }
    )
  }

  renderMain = () => {
    return [
      this.renderInput(),
      this.renderSelect()
    ]
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'auto-complete'
        }),
        style: this.props.style
      },
      this.renderMain()
    )
  }
}
