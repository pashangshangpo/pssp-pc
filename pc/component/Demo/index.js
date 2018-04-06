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
  RadioTag,
  CheckableTag,
  Button,
  ButtonGroup,
  RadioButton,
  Affix,
  Textarea
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

      // ---- Tag ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Tag ----'
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

      // ---- MultipleTag ----
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

      // ---- RadioTag ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- RadioTag ----'
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

      // ---- CheckableTag ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- CheckableTag ----'
      ),
      el(
        CheckableTag,
        {
          data: [
            {
              checked: true,
              content: 'Tag1'
            },
            {
              checked: false,
              content: 'Tag2'
            },
            {
              checked: true,
              content: 'Tag3'
            }
          ],
          onChange: tag => {
            console.log('CheckableTag', tag)
          }
        }
      ),

      // ---- Input ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Input ----'
      ),
      el(
        Input,
        {
          type: 'text',
          placeholder: 'Input'
        }
      ),

      // ---- Button ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Button ----'
      ),
      el(
        Button,
        {
          type: 'primary',
          onClick: e => {
            console.log('primary', e)
          }
        },
        'primary'
      ),
      el(
        Button,
        {
          onClick: e => {
            console.log('default', e)
          }
        },
        'default'
      ),
      el(
        Button,
        {
          type: 'dashed',
          onClick: e => {
            console.log('dashed', e)
          }
        },
        'dashed'
      ),
      el(
        Button,
        {
          disabled: true,
          onClick: e => {
            console.log('disabled', e)
          }
        },
        'disabled'
      ),
      el(
        Button,
        {
          type: 'primary',
          loading: true,
          onClick: e => {
            console.log('loading', e)
          }
        },
        'loading'
      ),

      // ---- ButtonGroup ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- ButtonGroup ----'
      ),
      el(
        ButtonGroup,
        {},
        el(
          Button,
          {
            type: 'default',
            onClick: e => {
              console.log('default', e)
            }
          },
          'default'
        ),
        el(
          Button,
          {
            onClick: e => {
              console.log('default', e)
            }
          },
          'default'
        ),
        el(
          Button,
          {
            type: 'default',
            onClick: e => {
              console.log('default', e)
            }
          },
          'default'
        )
      ),

      // ---- Affix ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Affix ----'
      ),
      el(
        Affix,
        {
          offsetTop: 30,
          onChange: isFixed => {
            console.log('isFixed', isFixed)
          }
        },
        el(
          'div',
          {},
          '固定'
        )
      ),

      // ---- RadioButton ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- RadioButton ----'
      ),
      el(
        RadioButton,
        {
          checked: 'CCC',
          data: [
            {
              value: 'AAA'
            },
            {
              value: 'BBB'
            },
            {
              value: 'CCC'
            }
          ],
          onChange: button => {
            console.log('RadioButton', button)
          }
        }
      ),

      // ---- Textarea ----
      el(
        'div',
        {
          className: 'section'
        },
        '---- Textarea ----'
      ),
      el(
        Textarea,
        {
          autoFocus: false,
          placeholder: 'Textarea',
          value: '',
          onInput: e => {
            console.log('Textarea', e.target.value)
          }
        }
      ),
    )
  }
}
