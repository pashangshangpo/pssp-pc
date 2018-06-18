/**
 * @file Button
 * @author pashangshangpo
 */

import Button from '../../components/Button'
import {el, Log} from '../../common'

const log = new Log('Button')

export default () => {
  return el(
    'div',
    {},
    el(
      Button,
      {
        type: 'primary',
        onClick: e => {
          log.message('primary', e)
        }
      },
      'primary'
    ),
    el(
      Button,
      {
        onClick: e => {
          log.message('default', e)
        }
      },
      'default'
    ),
    el(
      Button,
      {
        type: 'dashed',
        onClick: e => {
          log.message('dashed', e)
        }
      },
      'dashed'
    ),
    el(
      Button,
      {
        disabled: true,
        onClick: e => {
          log.message('disabled', e)
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
          log.message('loading', e)
        }
      },
      'loading'
    )
  )
}
