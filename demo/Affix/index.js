/**
 * @file Affix
 * @author pashangshangpo
 */

import Affix from '../../component/Affix'
import {el, Log} from '../../common'

const log = new Log('Affix')

export default () => {
  return el(
    Affix,
    {
      className: '',
      target: window,
      offsetTop: 10,
      onChange: isFixed => {
        log.message(isFixed)
      }
    },
    el(
      'div',
      {},
      '我被固定了'
    )
  )
}
