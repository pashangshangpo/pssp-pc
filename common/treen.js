/**
 * @file treen
 * @author pashangshangpo
 */

class Treen {
  constructor() {
    this.treen = new Map()

    this.treen.set('root', {
      id: 'root',
      children: [],
      parentId: null
    })
  }

  /**
   * 获取UID
   */
  getUID() {
    return `uid-${this.treen.size + 1}-${Date.now().toString(16)}${Math.random().toString(16)}`
  }

  /**
   * 获取整个节点树
   */
  getTreen() {
    const treen = this.treen
    const res = []
    const _this = this

    // 将所有节点先返到res中, 方便后面循环
    for (let key of treen.keys()) {
      const node = treen.get(key)

      node.children = []

      Object.defineProperties(node, {
        parentNode: {
          configurable: true,
          enumerable: true,
          get() {
            if (node.parentId) {
              return _this.getNode(node.parentId)
            }
  
            return _this.getRoot()
          }
        },
        firstChild: {
          configurable: true,
          enumerable: true,
          get() {
            if (node.children.length > 0) {
              return node.children[0]
            }
  
            return null
          }
        },
        lastChild: {
          configurable: true,
          enumerable: true,
          get() {
            if (node.children.length > 0) {
              return node.children[node.children.length - 1]
            }
  
            return null
          }
        },
        preSibling: {
          configurable: true,
          enumerable: true,
          get() {
            const children = node.parentNode.children
            const index = children.indexOf(node)
  
            if (index > 0) {
              return children[index - 1]
            }
  
            return null
          }
        },
        nextSibling: {
          configurable: true,
          enumerable: true,
          get() {
            const children = node.parentNode.children
            const index = children.indexOf(node)
  
            if (index > -1 && index < children.length - 1) {
              return children[index + 1]
            }
  
            return null
          }
        },
        showChild: {
          configurable: true,
          enumerable: true,
          get() {
            return !!(node.children.length > 0 && node.open)
          }
        }
      })

      res.push(node)
    }
    
    // 调整节点位置
    let index = 0
    let len = res.length - 1
    while(index < len) {
      const node = res[index]
      if (node) {
        if (node.parentId) {
          treen.get(node.parentId).children.push(node)
          
          res.splice(res.findIndex(n => n.id === node.id), 1)
          index -= 1
        }
        else if (node.parentId !== null) {
          node.parentId = 'root'
        }
      }

      index += 1
    }

    // 将所有节点放置到根节点中
    const children = res.slice(1)
    const rootNode = res[0]

    for (let n of children) {
      rootNode.children.push(n)
    }

    return rootNode
  }

  /**
   * 获取根节点
   */
  getRoot() {
    return this.treen.get('root')
  }

  /**
   * 返回节点
   * @param {String} id
   */
  getNode(id) {
    return this.treen.get(id)
  }

  /**
   * 返回子节点
   * @param {String} id
   */
  getChildren(id) {
    return this.getNode(id).children
  }

  /**
   * 获取父节点
   * @param {String} id 
   */
  getParent(id) {
    return this.getNode(id).parentNode
  }

  /**
   * 添加节点
   * @param {Object, Array} node 
   */
  addNode(node) {
    if (!Array.isArray(node)) {
      node = [node]
    }

    for (let n of node) {
      this.treen.set(n.id, n)
    }
  }

  /**
   * 删除节点
   * @param {String} id 
   */
  removeNode(id) {
    this.treen.delete(id)
  }

  /**
   * 修改节点
   * @param {String} id 
   * @param {Object} newValue 
   * @return {Object} 修改后的节点
   */
  editNode(id, newValue) {
    const node = this.getNode(id)

    for (let key of Object.keys(newValue)) {
      node[key] = newValue[key]
    }

    this.treen.set(id, node)

    return node
  }
}

export default Treen
