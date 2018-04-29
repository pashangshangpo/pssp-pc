/**
 * @file Hotkey
 * @author pashangshangpo
 * @createTime 2018年4月29日 下午4:20
 */

import Hotkey from '../../component/Hotkey'
import { el, Log } from '../../common'

const log = new Log('Hotkey')

export default () => {
  return el(
    Hotkey,
    {
      event: {
        'a b': e => {
          console.log(e.keyCode)
        }
      }
    },
    // el(
    //   'div',
    //   {
    //     style: {
    //       height: 30
    //     }
    //   },
    //   'hotkey 1'
    // ),
    // el(
    //   'div',
    //   {
    //     style: {
    //       height: 30
    //     }
    //   },
    //   'hotkey 2'
    // )
  )
}
