/**
 * @file 组件DEMO
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {
  el,
  c
} from '../../../common'
import {
  Tag
} from '../../index'
import './index.less'

export default class extends Component {
  render() {
    return el(
      'div',
      {
        className: c('demo')
      },
      el(
        'div',
        {},
        el(
          'div',
          {},
          '---- Tag组件 ----'
        ),
        el(
          Tag,
          {
            color: 'rgb(45, 183, 245)'
          }
        )
      )
    )
  }
}
