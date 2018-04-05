/**
 * @file Input组件
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {el, c} from '../../../common'
import './index.less'

export default class extends Component {
  static defaultProps = {
    className: ''
  }

  render() {
    return el(
      'input',
      Object.assign(
        {},
        this.props,
        {
          className: c({
            default: this.props.className,
            prefix: 'input'
          }),
          children: null
        }
      )
    )
  }
}