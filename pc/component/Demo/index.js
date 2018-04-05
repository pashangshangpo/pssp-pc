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
  Input,
  MultipleTag,
  RadioTag
} from '../../index'
import './index.less'

export default class extends Component {
  state = {
    tags: ['A', 'B', 'C']
  }

  renderTags = () => {
    return this.state.tags.map(tag => {
      return el(
        Tag,
        {
          isRemove: true,
          onClick: e => {
            console.log('click', e.currentTarget)
          },
          onRemove: e => {
            console.log('remove', e.currentTarget)
          }
        },
        tag
      )
    })
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
      this.renderTags(),
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

      // ---- MultipleTag组件 ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- MultipleTag ----'
      ),
      el(
        MultipleTag,
        {
          data: ['AAA', 'BBB', 'CCC'],
          isRemove: true,
          add: {
            text: '添加',
            placeholder: '输入内容',
            onAdd: content => {
              console.log('add', content)
            }
          }
        }
      ),

      // ---- RadioTag组件 ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- RadioTag组件 ----'
      ),
      el(
        RadioTag,
        {
          checked: 'Tag2',
          data: ['Tag1', 'Tag2'],
          onChange: tag => {
            console.log(tag)
          }
        }
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
