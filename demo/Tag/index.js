/**
 * @file Tag
 * @author pashangshangpo
 */

import Tag from '../../components/Tag'
import {el, Log} from '../../common'

const log = new Log('Tag')

export default () => {
  return el(
    'div',
    {},
    el(
      Tag,
      {
        isRemove: true,
        onClick: e => {
          log.message('click', e.currentTarget)
        },
        onRemove: e => {
          log.message('remove', e.currentTarget)
        }
      },
      'AAA'
    ),
    el(
      Tag,
      {
        isAdd: true,
        onAdd: content => {
          log.message('addTag', content)
        }
      },
      '添加'
    )
  )
}
