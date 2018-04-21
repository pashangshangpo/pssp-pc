/**
 * @file Input
 * @author pashangshangpo
 */

import Input from '../../component/Input'
import {el, Log} from '../../../common'

const log = new Log('Input')

export default () => {
  return el(
    Input,
    {
      type: 'text',
      placeholder: '你想说什么',
      onChange: e => {
        log.message(e)
      }
    }
  )
}
