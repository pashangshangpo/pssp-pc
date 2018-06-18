/**
 * @file RadioButton
 * @author pashangshangpo
 */

import RadioButton from '../../components/RadioButton'
import {el, Log} from '../../common'

const log = new Log('RadioButton')

export default () => {
  return el(
    RadioButton,
    {
      checked: 'CCC',
      data: [
        {
          value: 'AAA'
        },
        {
          value: 'BBB'
        },
        {
          value: 'CCC'
        }
      ],
      onChange: button => {
        log.message(button)
      }
    }
  )
}
