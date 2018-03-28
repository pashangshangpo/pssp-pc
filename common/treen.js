/**
 * treen
 */

class Node {
  constructor() {
    this.nodes = {};
  }
  // 获取node
  getNodeAll() {
    return this.nodes;
  }
  // 获取节点值
  getNode(id) {
    return this.nodes[id];
  }
  // 获取父节点
  getParentNode(id) {
    return this.getNode(id).parentNode;
  }
  // 获取子节点
  getChild(id) {
    return this.getNode(id).children;
  }
  // 添加一个节点
  addNode(node) {
    this.nodes[node.id] = node;
  }
  // 删除一个节点
  removeNode(id, all = false, removeId = []) {
    let node = this.getNode(id);

    const remove = (children, all, removeId) => {
      for (let item of children) {
        this.removeNode(item.id, all, removeId);
      }
    };

    removeId.push(id);

    // 删除所有子节点
    if (all) {
      remove(node.children, all, removeId);
    }
    delete this.nodes[id];

    return removeId;
  }
  // 修改节点
  editNode(id, cb) {
    const preNode = Object.assign({}, this.nodes[id]);
    this.nodes[id] = cb(this.getNode(id));

    return this.getUpdateProps(preNode, this.nodes[id]);
  }
  // 获取更新了的属性
  getUpdateProps(preNode, backNode) {
    let up = null;

    for (let key of Object.keys(backNode)) {
      let pre = preNode[key];
      let back = backNode[key];

      // 防止属性是一个监听对象 或者[] {} function
      if (pre) {
        try {
          pre = JSON.stringify(preNode[key]);
          back = JSON.stringify(backNode[key]);
        }
        catch (err) {
        }
      }

      if (pre != back) {
        // 过滤key
        if ([
          'index',
          'content',
          'type',
          'status',
          'open',
          'parentId',
          'hide'
        ].indexOf(key) > -1) {
          if (!up) {
            up = { key: [], node: backNode };
          }

          up.key.push(key);
        }
      }
    };

    return up;
  }
}

class Treen {
  constructor() {
    // 树根
    const root = {
      id: 'root',
      parentNode: null,
      nextSibling: null,
      preSibling: null,
      open: true,
      showChild: true,
      // 获取第一个子节点
      get firstChild() {
        return root.children[0] || null;
      },
      // 获取最后一个子节点
      get lastChild() {
        return root.children[root.children.length - 1] || null;
      },
      children: []
    };
    const node = new Node();

    // 监听更新节点
    this.watchUpdate = () => { };

    this.addNode = node.addNode.bind(node);
    this.getNode = node.getNode.bind(node);
    this.editNode = (id, cb) => {
      const edit = node.editNode(id, cb);

      // 触发更新
      if (edit) {
        this.watchUpdate(edit);
      }
    };
    this.removeNode = node.removeNode.bind(node);
    this.getNodeSource = node.getNodeAll.bind(node);
    this.getParentNode = node.getParentNode.bind(node);
    this.upMoveNode = this.upMoveNode.bind(this);
    this.downMoveNode = this.downMoveNode.bind(this);
    this.leftMoveNode = this.leftMoveNode.bind(this);
    this.rightMoveNode = this.rightMoveNode.bind(this);
    this.getChild = node.getChild.bind(node);
    this.changeParentNode = this.changeParentNode.bind(this);

    this.watchUpdateNode = this.watchUpdateNode.bind(this);
    this.upIndex = this.upIndex.bind(this);
    this.insertNode = this.insertNode.bind(this);
    this.getNodeAll = this.getNodeAll.bind(this);

    // 获取根节点
    this.getRoot = () => {
      return root;
    };
  }
  // 复制一份node
  copy = id => {
    const parseNode = (node, res = []) => {
      if (node) {
        let {
          children, 
          firstChild,
          lastChild,
          nextSibling,
          parentNode,
          preSibling,
          showChild,
          ...newNode
        } = node
        // 必须使用一个新的,不能使用之前的,防止冲突
        newNode = Object.assign(
          {},
          newNode,
          {
            id: getUid()
          }
        )

        res.push(newNode)
        children = children || []
        for (let n of children) {
          n = Object.assign(
            {},
            n,
            {
              parentId: newNode.id
            }
          )

          parseNode(n, res)
        }
      }

      return res
    }

    return parseNode(typeof id === 'string' ? this.getNode(id) : id)
  }
  // 解析树
  parse(arr) {
    /**
     * 使用get方法,避免循环引用 parentNode > childNode > parentNode
     * 使用get方法,动态获取子节点,在创建父节点时,还无法确定第一个节点和最后一个节点
     * 注意不要循环访问自己,否则导致死循环
     * 
     * 第一版实现时,节点只引用对方的ID,从而避免循环引用, 但这种方式的缺点在于,每次父节点或子节点改变时,都要重新计算一遍
     * 而如果使用get方法,则每次都会自动更新
     */

    const root = this.getRoot();
    root.children = [];

    for (let item of arr) {
      const hasIndex = item.index != undefined;

      // 默认值
      item.status = item.status || '';
      item.type = item.type || [];

      // 定义常用属性方法
      Object.defineProperties(item, {
        // 获取父节点
        parentNode: {
          configurable: true,
          enumerable: true,
          get: () => {
            // 这里不要使用this.getParentNode,否则死循环
            return item.parentId !== root.id ? this.getNode(item.parentId) || null : root;
          }
        },
        // 获取第一个子节点
        firstChild: {
          configurable: true,
          enumerable: true,
          get: () => {
            return item.children ? item.children[0] || null : null;
          }
        },
        // 获取最后一个子节点
        lastChild: {
          configurable: true,
          enumerable: true,
          get: () => {
            return item.children ? item.children[item.children.length - 1] || null : null;
          }
        },
        // 上一个兄弟节点
        preSibling: {
          configurable: true,
          enumerable: true,
          get: () => {
            const parentNode = item.parentNode;
            let preSibling = null;
            if (parentNode) {
              const children = parentNode.children;
              preSibling = children ? children[children.indexOf(item) - 1] || null : null;
            }

            return preSibling;
          }
        },
        // 下一个兄弟节点
        nextSibling: {
          configurable: true,
          enumerable: true,
          get: () => {
            const parentNode = item.parentNode;
            let nextSibling = null;
            if (parentNode) {
              const children = parentNode.children;
              nextSibling = children ? children[children.indexOf(item) + 1] || null : null;
            }

            return nextSibling;
          }
        },
        // 获取是否显示子节点
        showChild: {
          configurable: true,
          enumerable: true,
          get: () => {
            return (item.children && item.children.length > 0 && item.open) || false;
          }
        }
      });

      const parentId = item.parentId;

      if (parentId != undefined && parentId !== '') {
        const parentNode = item.parentNode;
        if (parentNode) {
          if (hasIndex) {
            this.insertNode(item, parentNode);
          }
          else {
            item.index = parentNode.children.length;
            parentNode.children.push(item);
          }
        }
        else {
          // this.removeNode(item.id);
          item.parentId = root.id;

          if (hasIndex) {
            this.insertNode(item, root);
          }
          else {
            item.index = root.children.length;
            root.children.push(item);
          }
        }
      }
      else {
        item.parentId = root.id;

        if (hasIndex) {
          this.insertNode(item, root);
        }
        else {
          item.index = root.children.length;
          root.children.push(item);
        }
      }
    }

    return root.children;
  }
  // 获取解析后的树
  getTreen() {
    const arr = [];
    const props = this.getNodeSource();

    Object.keys(props).forEach(key => {
      const item = props[key];

      // 防止使用上一次的
      delete item.parentNode;
      delete item.firstChild;
      delete item.lastChild;
      delete item.preSibling;
      delete item.nextSibling;
      delete item.showChild;

      item.children = [];

      arr.push(item);
    });

    return this.parse(arr);
  }
  // 按照顺序解析树
  getOrderTreen() {
    const res = [];
    // 按照顺序访问
    const forBox = box => {
      for (let section of box) {
        const children = section.children;

        res.push(section);

        if (children.length > 0) {
          forBox(children);
        }
      }
    };

    forBox(this.getTreen());
    return res;
  }
  // 获取更新节点
  watchUpdateNode(cb) {
    this.watchUpdate = cb;
  }
  // 更新index
  upIndex(type, node) {
    let index = 0;

    const indexs = {
      addChild: () => {
        const lastChild = node.lastChild;

        if (lastChild) {
          return index = node.lastChild.index + 1;
        }
      },
      addParent: () => {
        if (node) {
          return node.index;
        }
        else {
          const lastChild = this.getRoot().lastChild;
          if (lastChild) {
            return index = lastChild.index + 1;
          }
        }
      },
      addSiblingNext: () => {
        let nextSibling = node.nextSibling;
        if (nextSibling) {
          let tempIndex = nextSibling.index;
          index = tempIndex;

          // 更新之后的所有元素index值
          while (nextSibling) {
            this.editNode(nextSibling.id, node => {
              node.index = tempIndex += 1;
              return node;
            });
            nextSibling = nextSibling.nextSibling;
          }
        }
        else {
          index = node.parentNode.lastChild.index + 1;
        }

        return index;
      },
      addSiblingPre: () => {
        let nextSibling = node;
        let tempIndex = nextSibling.index;
        index = tempIndex;

        // 更新之后的所有元素index值
        while (nextSibling) {
          this.editNode(nextSibling.id, node => {
            node.index = tempIndex += 1;
            return node;
          });
          nextSibling = nextSibling.nextSibling;
        }

        return index;
      },
      moveUp: () => {
        const preSibling = node.preSibling;
        let index = 0;

        if (preSibling) {
          let tempIndex = preSibling.index;
          index = tempIndex;
          this.editNode(preSibling.id, node => {
            node.index = index + 1;
            return node;
          });
        }
        else if (node.parentNode.children.length > 1) {
          index = node.parentNode.lastChild.index + 1;
        }

        return index;
      },
      moveDown: () => {
        let nextSibling = node.nextSibling;
        let index = 0;

        if (nextSibling) {
          index = nextSibling.index;
          this.editNode(nextSibling.id, nextSibling => {
            nextSibling.index = node.index;
            return nextSibling;
          });
        }
        else if (node.parentNode.children.length > 1) {
          let preSibling = node.preSibling;
          while (preSibling) {
            this.editNode(preSibling.id, node => {
              node.index = preSibling.index + 1;
              return node;
            });
            preSibling = preSibling.preSibling;
          }
        }
        return index;
      },
      leftMove: () => {
        const parentNode = node.parentNode;
        let nextSibling = parentNode.nextSibling;
        let tempIndex = parentNode.index + 1;
        index = tempIndex;

        while (nextSibling) {
          // 如果值不小于上一个元素,则没有必要更新
          if (nextSibling.index === tempIndex + 1) {
            break;
          }

          this.editNode(nextSibling.id, node => {
            node.index = tempIndex += 1;
            return node;
          });
          nextSibling = nextSibling.nextSibling;
        }

        return index;
      }
    };

    return indexs[type]() || 0;
  }
  // 寻找合适的位置,插入一个节点
  insertNode(node, parentNode) {
    const children = parentNode.children;

    const index = children.findIndex(item => {
      return node.index < item.index;
    });

    children.splice(index > -1 ? index : children.length, 0, node);
  }
  // 向上移动一格
  upMoveNode(id) {
    this.editNode(id, node => {
      node.index = this.upIndex('moveUp', node);

      return node;
    });

    return true;
  }
  // 向下移动一格
  downMoveNode(id) {
    this.editNode(id, node => {
      node.index = this.upIndex('moveDown', node);

      return node;
    });

    return true;
  }
  // 向左移一格
  leftMoveNode(id) {
    let parentNode = null;

    this.editNode(id, node => {
      const oldParentNode = node.parentNode;
      parentNode = oldParentNode.parentNode;

      if (parentNode) {
        node.index = this.upIndex('leftMove', node);
        node.parentId = parentNode.id;

        // 防止没更新
        setTimeout(() => {
          if (oldParentNode.children.length === 0) {
            this.closeNode(oldParentNode.id);
          }
        });
      }

      return node;
    });

    return !!parentNode;
  }
  // 向右移一格
  rightMoveNode(id) {
    const parentNode = this.getParentNode(id);
    const children = parentNode.children;

    if (children.length > 1) {
      const index = children.indexOf(this.getNode(id));

      if (index > 0) {
        const target = children[index - 1];
        this.editNode(id, node => {
          node.index = this.upIndex('addChild', target);
          node.parentId = target.id;

          return node;
        });

        this.openNode(target.id);
        return true;
      }
    }

    return false;
  }
  // 更改父节点
  changeParentNode(id, targetId) {
    this.editNode(id, node => {
      node.parentId = targetId;

      return node;
    });
  }
  // 获取所有节点
  getNodeAll() {
    const arr = [];
    const props = this.getNodeSource();

    Object.keys(props).forEach(key => {
      const item = Object.assign({}, props[key]);
      arr.push(item);
    });

    return arr;
  }
  // 添加多个节点
  addNodes(nodes) {
    nodes.forEach(node => {
      this.addNode(node);
    });
  }
  // 展开节点
  openNode(id) {
    this.editNode(id, node => {
      node.open = true;
      return node;
    });
  }
  // 关闭节点
  closeNode(id) {
    this.editNode(id, node => {
      node.open = false;
      return node;
    });
  }
  // 切换节点
  toggleNode(id) {
    this.editNode(id, node => {
      node.open = !node.open;
      return node;
    });
  }
  // 展开节点到几级
  openLevel(id, level) {
    let count = 1;

    if (level <= count) {
      this.closeNode(id);
    }
    else {
      this.openNode(id);
    }

    let children = this.getNode(id).children;
    if (children.length > 0) {
      children.forEach(item => {
        this.openLevel(item.id, level - count);
      });
    }
  }
  // 关闭节点到几级
  closeLevel(id, level) {
    this.closeNode(id);
    let count = 1;

    if (level <= count) {
      return;
    }

    let children = this.getNode(id).children;
    if (children.length > 0) {
      children.forEach(item => {
        this.closeNode(item.id, level - count);
      });
    }
  }
  // 针对所有节点,展开到几级
  openLevelAll(level) {
    this.getRoot().children.forEach(item => {
      this.openLevel(item.id, level);
    });
  }
}

export default Treen;