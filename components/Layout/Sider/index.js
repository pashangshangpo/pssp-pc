/**
 * @file Sider
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Sider: props => Sider
   *  props: Object
   *    className: String
   *    style: Object
   *  children: ReactElement
   */
  static defaultProps = {
    className: '',
    style: {}
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'layout-sider'
        }),
        style: this.props.style
      },
      el(
        'div',
        {
          className: 'layout-sider-children'
        },
        this.props.children
      )
    )
  }
}
