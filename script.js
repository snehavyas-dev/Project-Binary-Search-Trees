const defaultValues = [25, 10, 50, 5, 15, 30, 70, 3, 12, 18, 27, 40, 60, 75, 90];

let tree = new Tree(defaultValues);

const levelList = document.getElementById('levelOrder');
const preList = document.getElementById('preOrder');
const postList = document.getElementById('postOrder');
const inList = document.getElementById('inOrder');
const balanceStatus = document.getElementById('balanceStatus');
const treeContainer = document.getElementById('treeContainer');

function updateStatus() {
  if (tree.isBalanced()) {
    balanceStatus.textContent = 'Balanced';
    balanceStatus.classList.remove('unbalanced');
    balanceStatus.classList.add('balanced');
  } else {
    balanceStatus.textContent = 'Unbalanced';
    balanceStatus.classList.remove('balanced');
    balanceStatus.classList.add('unbalanced');
  }
}

function renderList(target, values) {
  target.innerHTML = '';

  if (!values.length) {
    const item = document.createElement('li');
    item.textContent = 'No values';
    target.appendChild(item);
    return;
  }

  values.forEach((value) => {
    const item = document.createElement('li');
    item.textContent = value;
    target.appendChild(item);
  });
}

function getTreeLevels(root) {
  if (!root) return [];

  const levels = [];
  const queue = [{ node: root, level: 0 }];

  while (queue.length) {
    const { node, level } = queue.shift();
    if (!levels[level]) levels[level] = [];
    levels[level].push(node.data);

    if (node.left) queue.push({ node: node.left, level: level + 1 });
    if (node.right) queue.push({ node: node.right, level: level + 1 });
  }

  return levels;
}

function renderTree() {
  const levels = getTreeLevels(tree.root);
  treeContainer.innerHTML = '';

  levels.forEach((levelValues) => {
    const row = document.createElement('div');
    row.className = 'tree-row';

    const level = document.createElement('div');
    level.className = 'tree-level';

    levelValues.forEach((value) => {
      const node = document.createElement('div');
      node.className = 'tree-node';
      node.textContent = value;
      level.appendChild(node);
    });

    row.appendChild(level);
    treeContainer.appendChild(row);
  });
}

function renderTraversals() {
  const levelValues = [];
  tree.levelOrderForEach((value) => levelValues.push(value));

  const preValues = [];
  tree.preOrderForEach((value) => preValues.push(value));

  const postValues = [];
  tree.postOrderForEach((value) => postValues.push(value));

  const inValues = [];
  tree.inOrderForEach((value) => inValues.push(value));

  renderList(levelList, levelValues);
  renderList(preList, preValues);
  renderList(postList, postValues);
  renderList(inList, inValues);
}

function refreshUI() {
  updateStatus();
  renderTraversals();
  renderTree();
}

function generateRandomTree() {
  const randomValues = Array.from({ length: 14 }, () => Math.floor(Math.random() * 99) + 1);
  tree = new Tree(randomValues);
  refreshUI();
}

document.getElementById('generateTree').addEventListener('click', generateRandomTree);

document.getElementById('addValue').addEventListener('click', () => {
  const value = Number(document.getElementById('inputValue').value);
  if (!Number.isNaN(value)) {
    tree.insert(value);
    document.getElementById('inputValue').value = '';
    refreshUI();
  }
});

document.getElementById('deleteValueBtn').addEventListener('click', () => {
  const value = Number(document.getElementById('deleteValue').value);
  if (!Number.isNaN(value)) {
    tree.deleteItem(value);
    document.getElementById('deleteValue').value = '';
    refreshUI();
  }
});

document.getElementById('rebalanceTree').addEventListener('click', () => {
  tree.rebalance();
  refreshUI();
});

refreshUI();
