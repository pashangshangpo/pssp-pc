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
   *    style: Object
   *    value: String 初始value值
   *    placeholder: String
   *    autoFocus: Boolean 是否自动聚焦
   *    data: Array => Item 需要展示的列表项
   *      Item: Object
   *        content: [String, ReactElement]
   *    onChange: Function 输入的内容改变时调用
   *    onSelect: Function 选中列表时调用
   */
  static defaultProps = {
    className: '',
    style: {},
    value: '',
    placeholder: '',
    autoFocus: false,
    data: [],
    onChange: () => { },
    onSelect: () => { }
  }

  state = {
    showSelect: true,
    selected: null,
    activeIndex: 0,
    isHover: false,
    value: this.props.value
  }

  setProp = prop => {
    for (let key of Object.keys(prop)) {
      if (prop.hasOwnProperty(key)) {
        this.state[key] = prop[key]
      }
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

    if (this.state.value && selected) {
      this.props.onSelect(this.props.data[this.state.activeIndex])

      this.setState({
        value: selected.content || selected
      })
    }
  }

  handleInputChange = e => {
    const value = e.currentTarget.value

    this.setState({
      value,
      showSelect: !!value,
      activeIndex: value === '' ? 0 : this.state.activeIndex,
      selected: value === '' ? null : this.state.selected
    })

    this.props.onChange(e)
  }

  handleInputKeyDown = e => {
    const fn = this.caseKeyCode[e.keyCode]
    if (typeof fn === 'function') {
      e.preventDefault()
      fn(e)
    }
  }

  handleSelectMouseEnter = e => {
    this.setState({
      isHover: true
    })
  }

  handleSelectMouseLeave = e => {
    this.setState({
      selected: null,
      activeIndex: -1
    })
  }

  handleSelectItemClick = e => {
    const target = e.currentTarget
    const index = Array.from(target.parentNode.children).indexOf(target)

    this.props.onSelect(this.props.data[index])
    this.setState({
      showSelect: false
    })
  }

  handleSelectItemMouseEnter = (content, index) => {
    this.setState({
      selected: content,
      activeIndex: index
    })
  }

  caseKeyCode = {
    // 确定
    13: () => {
      if (!this.state.value) {
        return
      }

      if (!this.state.isHover) {
        this.setProp({
          selected: this.props.data[this.state.activeIndex]
        })
      }

      if (this.state.selected) {
        this.setProp({
          showSelect: false,
          value: this.state.selected.content
        })

        this.props.onSelect(this.state.selected)
      }
      else {
        this.setProp({
          showSelect: false
        })
      }
    },
    // 下移一项
    40: () => {
      let activeIndex = this.state.activeIndex + 1

      if (activeIndex >= this.props.data.length) {
        activeIndex = 0
      }

      this.setState({
        activeIndex,
        isHover: false
      })
    },
    // 上移一项
    38: () => {
      let activeIndex = this.state.activeIndex - 1

      if (activeIndex < 0) {
        activeIndex = this.props.data.length - 1
      }

      this.setState({
        activeIndex,
        isHover: false
      })
    }
  }

  setActive = index => {
    if (index >= this.props.data.length || index < 0) {
      return false
    }

    this.setState({
      activeIndex: index,
      isHover: false,
      showSelect: false,
      value: this.props.data[index]
    })

    return true
  }

  renderInput = () => {
    return el(
      Input,
      {
        type: 'text',
        value: this.state.value,
        autoFocus: this.props.autoFocus,
        placeholder: this.props.placeholder,
        onFocus: this.handleInputFocus,
        onBlur: this.hanldeInputBlur,
        onChange: this.handleInputChange,
        onKeyDown: this.handleInputKeyDown
      }
    )
  }

  renderSelectMain = () => {
    return this.props.data.map((item, index) => {
      return el(
        'div',
        {
          className: c({
            default: {
              autoCompleteSelectItem: true,
              autoCompleteSelected: item.content === this.state.value,
              autoCompleteActive: this.state.activeIndex === index,
              autoCompleteHover: this.state.isHover
            }
          }),
          onClick: this.handleSelectItemClick,
          onMouseEnter: this.handleSelectItemMouseEnter.bind(this, item.content, index)
        },
        item.content
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
        className: 'auto-complete-select',
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
