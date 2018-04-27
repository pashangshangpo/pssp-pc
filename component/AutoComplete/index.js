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

  state = {
    showSelect: true,
    selected: null,
    isHover: false,
    value: ''
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  handleInputFocus = () => {
    if (this.state.value) {
      this.setState({
        showSelect: true
      })
    }
  }

  hanldeInputBlur = () => {
    this.setState({
      showSelect: false,
      isHover: false
    })
  }

  handleInputChange = e => {
    const value = e.currentTarget.value

    this.changeState({
      value,
      showSelect: !!value
    })

    this.props.onChange(e)
  }

  handleSelectMouseLeave = e => {
    this.changeState({
      isHover: true
    })
  }

  renderInput = () => {
    return el(
      Input,
      {
        type: 'text',
        placeholder: this.props.placeholder,
        onFocus: this.handleInputFocus,
        onBlur: this.hanldeInputBlur,
        onChange: this.handleInputChange
      }
    )
  }

  renderSelectMain = () => {
    return this.props.data.map((content, index) => {
      const selected = content === this.state.selected || (!this.state.selected && index === 0)

      return el(
        'div',
        {
          className: c({
            default: {
              selectItem: true,
              selected,
              hover: selected && this.state.isHover
            }
          }),
          onMouseLeave: this.handleSelectMouseLeave
        },
        content
      )
    })
  }

  renderSelect = () => {
    if (!this.state.showSelect) {
      return null
    }

    return el(
      'div',
      {
        className: 'select'
      },
      this.renderSelectMain()
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
