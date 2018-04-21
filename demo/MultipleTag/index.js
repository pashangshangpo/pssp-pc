/**
 * @file MultipleTag
 * @author pashangshangpo
 */

import MultipleTag from '../../component/MultipleTag'
import {el, Log} from '../../common'

const log = new Log('MultipleTag')

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
          log.message('add', content)
        }
      }
    }
  )
}
