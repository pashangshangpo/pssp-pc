/**
 * @file Form
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Form from '../../component/Form'
import Input from '../../component/Input'
import CheckableTag from '../../component/CheckableTag'
import RadioTag from '../../component/RadioTag'
import Textarea from '../../component/Textarea'

export default () => {
  let form = null

  return el(
    Form,
    {
      ref: ref => form = ref,
      data: [
        {
          name: '姓名',
          content: el(
            Input,
            {
              type: 'text',
              placeholder: '请输入姓名',
              onChange: () => {
                console.log(form.validate())
              }
            }
          ),
          type: 'inputText',
          rule: {
            require: true,
            len: 3,
            requireMessage: '请输入姓名',
            errorMessage: '输入错误'
          }
        },
        {
          name: '年龄',
          content: el(
            Input,
            {
              type: 'number',
              placeholder: '请输入年龄',
              onChange: () => {
                console.log(form.validate())
              }
            }
          ),
          type: 'inputNumber',
          rule: {
            require: true,
            min: 3,
            max: 5,
            pattern: /a/,
            requireMessage: '请输入年龄',
            errorMessage: '输入错误'
          }
        },
        {
          name: '性别',
          content: el(
            RadioTag,
            {
              checked: '男',
              data: ['男', '女'],
              onChange: tag => {
                console.log(tag)
              }
            }
          )
        },
        {
          name: '兴趣爱好',
          content: el(
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
              onChange: tag => {
                console.log('CheckableTag', tag)
              }
            }
          ),
          type: 'checkableTag',
          rule: {
            require: true,
            requireMessage: '请输入年龄',
            errorMessage: '输入错误'
          }
        },
        {
          name: '个性签名',
          content: el(
            Textarea,
            {
              autoFocus: false,
              placeholder: '这个人很懒, 什么都没有写',
              minLine: 3,
              onInput: e => {
                console.log('Textarea', e.target.value)
              }
            }
          ),
          type: 'textarea',
          rule: {
            require: true,
            requireMessage: '请输入个性签名',
            errorMessage: '输入错误'
          }
        }
      ]
    }
  )
}
