/**
 * @file Form
 * @author pashangshangpo
 */

import Form from '../../component/Form'
import Input from '../../component/Input'
import CheckableTag from '../../component/CheckableTag'
import RadioTag from '../../component/RadioTag'
import Textarea from '../../component/Textarea'
import {el, Log} from '../../common'

const log = new Log('Form')

export default () => {
  let form = null

  return el(
    'div',
    {},
    el(
      Form,
      {
        ref: ref => form = ref,
        messageDirection: 'bottom',
        data: [
          {
            name: '姓名',
            type: 'inputText',
            rule: {
              require: true,
              len: 4,
              requireMessage: '请输入姓名',
              errorMessage: '姓名最大4位数'
            }
          },
          {
            name: '年龄',
            type: 'inputNumber',
            rule: {
              require: true,
              min: 1,
              max: 130,
              requireMessage: '请输入年龄',
              errorMessage: '年龄区间范围1-130'
            }
          },
          {
            name: '性别'
          },
          {
            name: '兴趣爱好',
            type: 'checkableTag',
            rule: {
              require: true,
              requireMessage: '至少选择一项'
            }
          },
          {
            name: '个性签名',
            type: 'textarea',
            rule: {
              require: true,
              len: 5,
              requireMessage: '请输入个性签名',
              errorMessage: '最多只能输入5字'
            }
          }
        ]
      },
      el(
        Input,
        {
          type: 'text',
          placeholder: '请输入姓名',
          onChange: e => {
            log.message('姓名', e.target.value)
          }
        }
      ),
      el(
        Input,
        {
          type: 'number',
          placeholder: '请输入年龄',
          onChange: e => {
            log.message('年龄', e.target.value)
          }
        }
      ),
      el(
        RadioTag,
        {
          checked: '男',
          data: ['男', '女'],
          onChange: tag => {
            log.message('性别', tag)
          }
        }
      ),
      el(
        CheckableTag,
        {
          data: [
            {
              checked: true,
              content: '读书'
            },
            {
              checked: true,
              content: '钓鱼'
            },
            {
              checked: false,
              content: '骑行'
            }
          ],
          onChange: (tags, tag) => {
            log.message('兴趣爱好', tags, tag)
          }
        }
      ),
      el(
        Textarea,
        {
          autoFocus: false,
          placeholder: '这个人很懒, 什么都没有写',
          minLine: 3,
          onInput: e => {
            log.message('个性签名', e.target.value)
          }
        }
      )
    ),
    el(
      'input',
      {
        type: 'button',
        value: '校验数据',
        onClick: () => {
          log.message('校验结果', form.validate())
        }
      }
    )
  )
}
