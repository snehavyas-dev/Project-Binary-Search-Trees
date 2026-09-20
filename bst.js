(function (global, factory) {
  const api = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.Node = api.Node;
  global.Tree = api.Tree;
  global.prettyPrint = api.prettyPrint;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }

    buildTree(array) {
      if (!array || array.length === 0) return null;

      const sorted = [...new Set(array)].sort((a, b) => a - b);
      return this.buildBalancedTree(sorted, 0, sorted.length - 1);
    }

    buildBalancedTree(array, start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
      node.left = this.buildBalancedTree(array, start, mid - 1);
      node.right = this.buildBalancedTree(array, mid + 1, end);
      return node;
    }

    insert(value) {
      if (this.root === null) {
        this.root = new Node(value);
        return;
      }

      let current = this.root;
      while (current) {
        if (value === current.data) return;
        if (value < current.data) {
          if (current.left === null) {
            current.left = new Node(value);
            return;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = new Node(value);
            return;
          }
          current = current.right;
        }
      }
    }

    includes(value) {
      let current = this.root;
      while (current) {
        if (value === current.data) return true;
        if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return false;
    }

    deleteItem(value) {
      this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
      if (node === null) return null;

      if (value < node.data) {
        node.left = this.deleteNode(node.left, value);
        return node;
      }

      if (value > node.data) {
        node.right = this.deleteNode(node.right, value);
        return node;
      }

      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const successor = this.minValueNode(node.right);
      node.data = successor.data;
      node.right = this.deleteNode(node.right, successor.data);
      return node;
    }

    minValueNode(node) {
      let current = node;
      while (current.left !== null) {
        current = current.left;
      }
      return current;
    }

    levelOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error('A callback is required');
      }

      if (!this.root) return;

      const queue = [this.root];
      const values = [];

      while (queue.length > 0) {
        const current = queue.shift();
        values.push(current.data);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }

      values.forEach(callback);
    }

    inOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error('A callback is required');
      }
      this.inOrderTraversal(this.root, callback);
    }

    preOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error('A callback is required');
      }
      this.preOrderTraversal(this.root, callback);
    }

    postOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error('A callback is required');
      }
      this.postOrderTraversal(this.root, callback);
    }

    inOrderTraversal(node, callback) {
      if (!node) return;
      this.inOrderTraversal(node.left, callback);
      callback(node.data);
      this.inOrderTraversal(node.right, callback);
    }

    preOrderTraversal(node, callback) {
      if (!node) return;
      callback(node.data);
      this.preOrderTraversal(node.left, callback);
      this.preOrderTraversal(node.right, callback);
    }

    postOrderTraversal(node, callback) {
      if (!node) return;
      this.postOrderTraversal(node.left, callback);
      this.postOrderTraversal(node.right, callback);
      callback(node.data);
    }

    height(value) {
      const node = this.findNode(value);
      if (node === null || node === undefined) return undefined;
      return this.getHeight(node);
    }

    getHeight(node) {
      if (node === null) return -1;
      return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    depth(value) {
      const node = this.findNode(value);
      if (node === null || node === undefined) return undefined;

      let current = this.root;
      let depth = 0;
      while (current) {
        if (value === current.data) return depth;
        if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        depth += 1;
      }
      return undefined;
    }

    findNode(value) {
      let current = this.root;
      while (current) {
        if (value === current.data) return current;
        if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return null;
    }

    isBalanced() {
      return this.checkBalance(this.root) !== -1;
    }

    checkBalance(node) {
      if (node === null) return 0;

      const leftHeight = this.checkBalance(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = this.checkBalance(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
      const values = [];
      this.inOrderForEach((value) => values.push(value));
      this.root = this.buildTree(values);
    }
  }

  function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }

  if (typeof require !== 'undefined' && require.main === module) {
    const randomArray = () =>
      Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

    const tree = new Tree(randomArray());
    console.log('Initial tree is balanced:', tree.isBalanced());
    console.log('Level order:');
    tree.levelOrderForEach((value) => console.log(value));
    console.log('Preorder:');
    tree.preOrderForEach((value) => console.log(value));
    console.log('Postorder:');
    tree.postOrderForEach((value) => console.log(value));
    console.log('Inorder:');
    tree.inOrderForEach((value) => console.log(value));

    [120, 130, 140, 150, 160].forEach((value) => tree.insert(value));
    console.log('After inserting large values, tree is balanced:', tree.isBalanced());
    tree.rebalance();
    console.log('After rebalance, tree is balanced:', tree.isBalanced());
    console.log('Balanced level order:');
    tree.levelOrderForEach((value) => console.log(value));
  }

  return { Node, Tree, prettyPrint };
});
