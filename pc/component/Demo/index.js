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
  Tag,
  Input
} from '../../index'
import './index.less'

export default class extends Component {
  render() {
    return el(
      'div',
      {
        className: c('demo')
      },

      // ---- Tag组件 ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Tag组件 ----'
      ),
      el(
        Tag,
        {},
        'Tag组件'
      ),
      el(
        Tag,
        {
          isAdd: true,
          onAdd: content => {
            console.log(content)
          }
        },
        '添加'
      ),

      // ---- Input组件 ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Input组件 ----'
      ),
      el(
        Input,
        {
          type: 'text',
          placeholder: 'Input组件',
          style: {
            height: '20px'
          }
        }
      )
    )
  }
}
