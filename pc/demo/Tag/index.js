/**
 * @file Tag
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Tag from '../../component/Tag'

export default () => {
  return el(
    'div',
    {},
    el(
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
      'AAA'
    ),
    el(
      Tag,
      {
        isAdd: true,
        onAdd: content => {
          console.log('addTag', content)
        }
      },
      '添加'
    )
  )
}
