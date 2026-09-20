const test = require('node:test');
const assert = require('node:assert/strict');
const { Node, Tree, prettyPrint } = require('./bst.js');

test('Tree builds a balanced BST and supports core operations', () => {
  const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

  assert.ok(tree.root instanceof Node);
  assert.equal(tree.includes(23), true);
  assert.equal(tree.includes(99), false);

  tree.insert(10);
  tree.insert(11);
  assert.equal(tree.includes(10), true);
  assert.equal(tree.includes(11), true);
  assert.equal(tree.isBalanced(), false);

  tree.deleteItem(4);
  assert.equal(tree.includes(4), false);

  const values = [];
  tree.levelOrderForEach((value) => values.push(value));
  assert.deepEqual(values, [8, 5, 67, 1, 7, 9, 324, 3, 23, 6345, 10, 11]);

  assert.equal(typeof tree.height(23), 'number');
  assert.equal(typeof tree.depth(23), 'number');

  const rebalanceTree = new Tree([5, 3, 8, 1, 4, 7, 9, 2, 6]);
  rebalanceTree.insert(100);
  rebalanceTree.insert(110);
  rebalanceTree.insert(120);
  assert.equal(rebalanceTree.isBalanced(), false);
  rebalanceTree.rebalance();
  assert.equal(rebalanceTree.isBalanced(), true);
  assert.equal(rebalanceTree.root.data, 6);

  assert.doesNotThrow(() => prettyPrint(tree.root));
});
