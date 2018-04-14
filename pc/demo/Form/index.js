/**
 * @file Form
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Form from '../../component/Form'
import Input from '../../component/Input'

export default () => {
  let form = null

  return el(
    Form,
    {
      ref: ref => form = ref,
      data: [
        {
          name: '名称',
          content: el(
            Input,
            {
              type: 'text',
              placeholder: '请输入名称',
              onChange: () => {
                console.log(form.validate())
              }
            }
          ),
          type: 'inputText',
          rule: {
            require: true,
            len: 3,
            min: 3,
            max: 5,
            pattern: /a/,
            requireMessage: '请输入内容',
            errorMessage: '输入错误'
          }
        }
      ]
    }
  )
}
