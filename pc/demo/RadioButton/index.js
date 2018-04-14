/**
 * @file RadioButton
 * @author pashangshangpo
 */

import el from '../../../common/el'
import RadioButton from '../../component/RadioButton'

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
        console.log('RadioButton', button)
      }
    }
  )
}
