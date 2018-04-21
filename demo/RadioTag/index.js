/**
 * @file RadioTag
 * @author pashangshangpo
 */

import RadioTag from '../../component/RadioTag'
import {el, Log} from '../../common'

const log = new Log('RadioButton')

export default () => {
  return el(
    RadioTag,
    {
      checked: 'Tag2',
      data: ['Tag1', 'Tag2'],
      onChange: tag => {
        log.message(tag)
      }
    }
  )
}
