/**
 * @file Hotkey
 * @author pashangshangpo
 * @createTime 2018年4月29日 下午4:20
 */

import Hotkey from '../../components/Hotkey'
import { el, Log } from '../../common'

const log = new Log('Hotkey')

export default () => {
  let hotkeyRef = null

  return [
    el(
      Hotkey,
      {
        ref: ref => hotkeyRef = ref,
        event: {
          'g': key => {
            log.message('global', key)

            hotkeyRef.un()
          }
        }
      }
    ),
    el(
      Hotkey,
      {
        event: {
          'meta+up ctrl+return i': (key, e) => {
            log.message('上')
          },
          'meta+a k down': () => {
            log.message('下')
          }
        }
      },
      el(
        'div',
        {
          style: {
            height: 30
          }
        },
        'meta+up ctrl+return i, meta+a k down'
      )
    )
  ]
}
