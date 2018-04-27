/**
 * @file AutoComplete
 * @author pashangshangpo
 */

import AutoComplete from '../../component/AutoComplete'
import {el, Log} from '../../common'

const log = new Log('AutoComplete')

export default () => {
  return el(
    AutoComplete,
    {
      className: '',
      data: ['AAA', 'BBB', 'CCC'],
      onSelect: content => {
        console.log(content)
      }
    }
  )
}
