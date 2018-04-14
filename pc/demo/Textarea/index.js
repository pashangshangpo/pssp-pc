/**
 * @file Textarea
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Textarea from '../../component/Textarea'

export default () => {
  return el(
    Textarea,
    {
      autoFocus: false,
      placeholder: '自适应高度',
      value: '',
      onInput: e => {
        console.log('Textarea', e.target.value)
      }
    }
  )
}
