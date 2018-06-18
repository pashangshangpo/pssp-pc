/**
 * @file Textarea
 * @author pashangshangpo
 */

import Textarea from '../../components/Textarea'
import {el, Log} from '../../common'

const log = new Log('Tag')

export default () => {
  return el(
    'div',
    {},
    el(
      Textarea,
      {
        autoFocus: false,
        placeholder: '自适应高度',
        value: '',
        onInput: e => {
          log.message('自适应高度', e.target.value)
        }
      }
    ),
    el(
      Textarea,
      {
        autoFocus: false,
        placeholder: '限定最小和最大高度',
        minLine: 3,
        maxLine: 5,
        value: '限定最小和最大高度限定最小和最大高度限定最小和最大高度限定最小和最大高度限定最小和最大高度限定最小和最大高度',
        onInput: e => {
          log.message('限定最小和最大高度', e.target.value)
        }
      }
    )
  )
}
