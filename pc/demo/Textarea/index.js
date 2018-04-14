/**
 * @file Textarea
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Textarea from '../../component/Textarea'

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
          console.log('Textarea', e.target.value)
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
          console.log('Textarea', e.target.value)
        }
      }
    )
  )
}
