/**
 * @file ButtonGroup
 * @author pashangshangpo
 */

import {el, Log} from '../../common'
import ButtonGroup from '../../components/ButtonGroup'
import Button from '../../components/Button'

const log = new Log('ButtonGroup')

export default () => {
  return el(
    ButtonGroup,
    {},
    el(
      Button,
      {
        type: 'default',
        onClick: e => {
          log.message('AAA', e)
        }
      },
      'AAA'
    ),
    el(
      Button,
      {
        onClick: e => {
          log.message('BBB', e)
        }
      },
      'BBB'
    ),
    el(
      Button,
      {
        type: 'default',
        onClick: e => {
          log.message('CCC', e)
        }
      },
      'CCC'
    )
  )
}
