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
    {
      style: {
        backgroundColor: '#fff'
      }
    },
    el(
      Sider,
      {
        style: {
          backgroundColor: '#fff'
        }
      },
      el(
        Menu,
        {
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
          ]
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
