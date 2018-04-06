/**
 * @file 按钮组
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: ButtonGroup: props => ButtonGroup
   *  props: Object
   *    className: String
   */
  static defaultProps = {
    className: ''
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'button-group'
        })
      },
      this.props.children
    )
  }
}
