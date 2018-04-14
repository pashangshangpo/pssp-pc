/**
 * @file Button
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Button from '../../component/Button'

export default () => {
  return el(
    'div',
    {},
    el(
      Button,
      {
        type: 'primary',
        onClick: e => {
          console.log('primary', e)
        }
      },
      'primary'
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
        type: 'dashed',
        onClick: e => {
          console.log('dashed', e)
        }
      },
      'dashed'
    ),
    el(
      Button,
      {
        disabled: true,
        onClick: e => {
          console.log('disabled', e)
        }
      },
      'disabled'
    ),
    el(
      Button,
      {
        type: 'primary',
        loading: true,
        onClick: e => {
          console.log('loading', e)
        }
      },
      'loading'
    )
  )
}
