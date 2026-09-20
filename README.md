# Binary Search Tree Project

This project is a JavaScript implementation of a Binary Search Tree (BST), built as part of The Odin Project curriculum. The goal is to organize values in a tree structure where every value to the left is smaller and every value to the right is larger.

## Project concept

A binary search tree is a data structure that supports efficient insert, search, and delete operations. In this project, the tree is built from a sorted, deduplicated array and then balanced to keep operations fast.

The project includes:
- Node and Tree classes
- Balanced tree construction
- Insert and delete operations
- Search with includes()
- Level-order, preorder, inorder, and postorder traversal
- Height and depth calculation
- Balance checking and rebalance support
- A small browser-based visual interface

## Files
- `bst.js` – BST logic and core algorithm
- `index.html` – landing page and UI layout
- `style.css` – modern styling for the project
- `script.js` – interactive browser behavior
- `bst.test.js` – logic checks for the assignment requirements

## How to run locally

Open the project folder in a browser, or run a local static server from the project root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## GitHub submission notes

This project is structured to be easy to upload to GitHub and present as a portfolio submission. Keep the project folder clean and include this README for context. The browser UI demonstrates the tree visually, while the JavaScript logic fulfills the assignment requirements.
