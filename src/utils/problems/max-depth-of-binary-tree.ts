import assert from "assert";
import { Problem } from "../types/problem";
import example from "./images/max-depth-1.jpg";

type MaxDepthFn = (root: TreeNode | null) => number;

const starterCodeMaxDepth = `
// Dont't change the function name
function maxDepth(root){
  // Write your code here
};`;

class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Helper function to convert array to binary tree
const arrayToTree = (arr: (number | null)[], index = 0): TreeNode | null => {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const root = new TreeNode(arr[index]!);
  root.left = arrayToTree(arr, 2 * index + 1);
  root.right = arrayToTree(arr, 2 * index + 2);

  return root;
};
// checks if the user has the correct code
const handlerMaxDepth = (fn: MaxDepthFn | unknown) => {
	try {
	  const nums = [
		[3, 9, 20, null, null, 15, 7],  // Input array representation of binary tree
		[1, null, 2]                    // Another test case
	  ];
  
	  const answers = [
		3, // Expected depth of the first tree
		2  // Expected depth of the second tree
	  ];
  
	  // Loop all tests to check if the user's code is correct
	  if(typeof fn === 'function'){
		for (let i = 0; i < nums.length; i++) {
			// Convert the array to a tree structure
			const tree = arrayToTree(nums[i]);
	  
			// Call the user's function with the tree as input
			const typedFn  = fn as MaxDepthFn;
			const result = typedFn(tree);
	  
			// Compare the result with the expected answer
			assert.deepStrictEqual(result, answers[i]);
		  }
		  
		  return true;
	  }
	  return false;
	  
	} catch (error: unknown) {
	  console.log("Max Depth Handler error", error);
	  return false;
	}
  };

export const maxDepthOfBinaryTree: Problem = {
  id: "max-depth-of-binary-tree",
  title: "5. Maximum Depth Of Binary Tree",
  problemStatement: `<p class='mt-3'>
  Given the <code>root</code> of a binary tree, return
  <em>its maximum depth</em>.
</p>
<p class='mt-3'>
 A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "root = [3,9,20,null,null,15,7]",
      outputText: "3",
      img: example.src,
    },
    {
      id: 2,
      inputText: "root = [1,null,2]",
      outputText: "2",
    },
  ],
  constraints: `<li class='mt-2'>
    The number of nodes in the tree is in the range 
  <code>[0, 10<sup>4</sup>]</code>
</li> <li class='mt-2'>
<code>-100 <= Node.val <= 100</code>`,
  handlerFunction: handlerMaxDepth,
  starterCode: starterCodeMaxDepth,
  order: 5,
  starterFunctionName: "function maxDepth(",
};
