/**
 * @file MultipleTag
 * @author pashangshangpo
 */

import el from '../../../common/el'
import MultipleTag from '../../component/MultipleTag'

export default () => {
  return el(
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
  )
}
