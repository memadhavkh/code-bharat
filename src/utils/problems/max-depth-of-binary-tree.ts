import assert from "assert";
import { Problem } from "../types/problem";
import example from './images/max-depth-1.jpg'
const starterCodeMaxDepth = `
// Dont't change the function name
function maxDepth(root){
  // Write your code here
};`;

// checks if the user has the correct code
// TODO: Incomplete
const handlerMaxDepth = (fn: any) => {
	// fn is the callback that user's code is passed into
	try {
		const nums = [
			[3,9,20,null,null,15,7],
            [1, null, 2]
		];
		const answers = [
			3,
            2
		];

		// loop all tests to check if the user's code is correct
		for (let i = 0; i < nums.length; i++) {
			// result is the output of the user's function and answer is the expected output
			const result = fn(nums[i], [i]);
			assert.deepStrictEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Max Depth Handler error");
		throw new Error(error);
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
            img: example.src
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
