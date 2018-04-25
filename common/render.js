/**
 * @file render方法
 * @author pashangshangpo
 */

import ReactDOM from 'react-dom'
import el from './el'

// 创建一个容器
const createContainer = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  return div
}

export default config => {
  const { context, component, container = createContainer(), cb = () => {} } = config
  if (context) {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      context,
      component,
      container,
      cb
    )
  }
  else {
    ReactDOM.render(
      component,
      container,
      cb
    )
  }
  
  return {
    getEl: () => {
      return container
    },
    destroy: () => {
      if (container) {
        document.body.removeChild(container)
        ReactDOM.unmountComponentAtNode(container)
      }
    }
  }
}
