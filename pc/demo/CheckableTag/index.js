/**
 * @file CheckableTag
 * @author pashangshangpo
 */

import el from '../../../common/el'
import CheckableTag from '../../component/CheckableTag'

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
      onChange: tag => {
        console.log('CheckableTag', tag)
      }
    }
  )
}
