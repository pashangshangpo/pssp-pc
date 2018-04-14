/**
 * @file ButtonGroup
 * @author pashangshangpo
 */

import el from '../../../common/el'
import ButtonGroup from '../../component/ButtonGroup'
import Button from '../../component/Button'

export default () => {
  return el(
    ButtonGroup,
    {},
    el(
      Button,
      {
        type: 'default',
        onClick: e => {
          console.log('default', e)
        }
      },
      'default'
    ),
    el(
      Button,
      {
        onClick: e => {
          console.log('default', e)
        }
      },
      'default'
    ),
    el(
      Button,
      {
        type: 'default',
        onClick: e => {
          console.log('default', e)
        }
      },
      'default'
    )
  )
}
