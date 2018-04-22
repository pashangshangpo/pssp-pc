/**
 * @file Layout
 * @author pashangshangpo
 */

import Layout, {Sider, Menu, Content} from '../../component/Layout'
import {el, Log} from '../../common'

const log = new Log('Layout')

export default () => {
  return el(
    Layout,
    {},
    el(
      Sider,
      {},
      '哈哈哈'
    ),
    el(
      Content,
      {},
      '我是内容内容'
    )
  )
}
