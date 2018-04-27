/**
 * @file AutoComplete
 * @author pashangshangpo
 * @createTime 2018年4月27日 上午9:24:39
 */

import React, { Component } from 'react'
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

  renderMain = () => {
    
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'auto-complete'
        })
      },
      this.renderMain()
    )
  }
}
