/**
 * @file Input
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Input from '../../component/Input'

export default () => {
  return el(
    Input,
    {
      type: 'text',
      placeholder: '你想说什么',
      onChange: e => {
        console.log(e)
      }
    }
  )
}
