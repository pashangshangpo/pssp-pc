/**
 * @file CheckableTag
 * @author pashangshangpo
 */

import CheckableTag from '../../components/CheckableTag'
import {el, Log} from '../../common'

const log = new Log('CheckableTag')

export default () => {
  return el(
    CheckableTag,
    {
      data: [
        {
          checked: true,
          content: 'Tag1'
        },
        {
          checked: false,
          content: 'Tag2'
        },
        {
          checked: true,
          content: 'Tag3'
        }
      ],
      onChange: (tags, tag) => {
        log.message(tags, tag)
      }
    }
  )
}
