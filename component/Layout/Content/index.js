/**
 * @file Content
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Content: props => Content
   *  props: Object
   *    className: String
   *  children: ReactElement
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
          prefix: 'layout-content'
        })
      },
      this.props.children
    )
  }
}
