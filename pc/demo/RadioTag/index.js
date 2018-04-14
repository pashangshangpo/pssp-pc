/**
 * @file RadioTag
 * @author pashangshangpo
 */

import el from '../../../common/el'
import RadioTag from '../../component/RadioTag'

export default () => {
  return el(
    RadioTag,
    {
      checked: 'Tag2',
      data: ['Tag1', 'Tag2'],
      onChange: tag => {
        console.log(tag)
      }
    }
  )
}
