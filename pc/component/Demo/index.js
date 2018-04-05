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
  state = {
    tags: ['A', 'B', 'C']
  }

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
      this.state.tags.map(tag => {
        return el(
          Tag,
          {
            isRemove: true,
            onClick: e => {
              console.log('click', e.currentTarget)
            },
            onRemove: e => {
              console.log('remove', e.currentTarget)
              return true
            }
          },
          tag
        )
      }),
      el(
        Tag,
        {
          isAdd: true,
          onAdd: content => {
            if (content) {
              this.state.tags.push(content)
              this.setState(this.state)
            }
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
