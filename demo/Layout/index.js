/**
 * @file Layout
 * @author pashangshangpo
 */

import Layout from '../../component/Layout'
import { el, Log } from '../../common'

const { Sider, Menu, Content } = Layout
const log = new Log('Layout')

export default () => {
  return el(
    Layout,
    {
      style: {
        backgroundColor: '#fff'
      }
    },
    el(
      Sider,
      {},
      el(
        Menu,
        {
          mode: 'vertical',
          checked: 'nav 1',
          data: [
            {
              name: 'nav 1'
            },
            {
              name: 'nav 2'
            },
            {
              name: 'nav 3',
              children: ['nav3 1', 'nav3 2']
            }
          ],
          onClick: (item, section, data) => {
            log.message('menu-click', item, section)
          },
          onOpenChange: (item, data) => {
            log.message('menu-change', item)
          }
        }
      )
    ),
    el(
      Content,
      {
        style: {
          padding: '12px'
        }
      },
      '我是内容内容'
    )
  )
}
