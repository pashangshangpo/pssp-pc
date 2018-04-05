/**
 * @file Svg组件
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def: Svg: props => Svg
   *  props
   *    className: String
   *    icon: Object require过的Svg对象
   */
  static defaultProps = {
    className: '',
    icon: {}
  }

  render() {
    let icon = this.props.icon
    if (!icon.viewBox) {
      icon = icon.default
    }

    return el(
      'svg',
      {
        className: c({
          default: this.props.className,
          prefix: 'svg'
        }),
        viewBox: icon.viewBox
      },
      el(
        'defs',
        {},
        el(
          'style',
          {},
          'path{fill:currentColor}'
        )
      ),
      el(
        'use',
        {
          xlinkHref: `#${icon.id}`
        }
      )
    )
  }
}
