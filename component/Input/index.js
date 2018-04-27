/**
 * @file Input组件
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {el, c} from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Input: props => Input
   *  props: Object
   */
  static defaultProps = {
    className: ''
  }

  render() {
    return el(
      'input',
      {
        ...this.props,
        className: c({
          default: this.props.className,
          prefix: 'input'
        }),
        children: null
      }
    )
  }
}
