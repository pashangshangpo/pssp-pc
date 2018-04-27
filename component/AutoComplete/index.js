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
    preSelected: '',
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

  hanldeInputBlur = e => {
    this.setState({
      showSelect: false,
      isHover: false
    })

    let selected = this.state.selected

    if (this.state.value && selected && this.state.preSelected !== selected) {
      this.props.onSelect(selected)

      this.setState({
        preSelected: selected,
        value: selected
      })
    }
  }

  handleInputChange = e => {
    const value = e.currentTarget.value

    this.changeState({
      value,
      showSelect: !!value
    })

    this.props.onChange(e)
  }

  handleSelectMouseEnter = e => {
    this.changeState({
      isHover: true
    })
  }

  handleSelectMouseLeave = e => {
    this.changeState({
      selected: null
    })
  }

  handleSelectItemClick = e => {
    const target = e.currentTarget
    const index = Array.from(target.parentNode.children).indexOf(target)

    this.props.onSelect(this.props.data[index])
    this.changeState({
      showSelect: false
    })
  }

  handleSelectItemMouseEnter = content => {
    this.changeState({
      selected: content
    })
  }

  renderInput = () => {
    return el(
      Input,
      {
        type: 'text',
        value: this.state.value,
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
              hover: this.state.isHover
            }
          }),
          onClick: this.handleSelectItemClick,
          onMouseEnter: this.handleSelectItemMouseEnter.bind(this, content)
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
        className: 'select',
        onMouseEnter: this.handleSelectMouseEnter,
        onMouseLeave: this.handleSelectMouseLeave
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
