/**
 * @file 单选标签
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {el, c} from '../../common'
import Tag from '../Tag'
import './index.less'

export default class extends Component {
  /**
   * @def-start: RadioTag: props => RadioTag
   *  props: Object
   *    className: String
   *    checked: * 选中项
   *    data: Array => * 数据列表
   *    onChange: tag => * 当返回false时不会被选中
   */
  static defaultProps = {
    className: '',
    checked: '',
    data: [],
    onChange: tag => {}
  }

  state = {
    checked: this.props.checked
  }

  handleChange = tag => {
    if (tag !== this.state.checked && this.props.onChange(tag) !== false) {
      this.state.checked = tag
      this.setState(this.state)
    }
  }

  renderMain = () => {
    return this.props.data.map(tag => {
      return el(
        Tag,
        {
          className: c({
            prefix: {
              tagChexked: tag === this.state.checked,
              tagUncheck: tag !== this.state.checked
            }
          }),
          onClick: this.handleChange.bind(this, tag)
        },
        tag
      )
    })
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'radio-tag'
        })
      },
      this.renderMain()
    )
  }
}
