import assert from "assert";
import { Problem } from "../types/problem";

export const subsetsHandler = (fn: any) => {
	try {
		const tests = [
			[1, 2, 3],
			[0]
		];
		const answers = [
            [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]],
            [[],[0]]
        ];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from Subsets Handler: ", error);
		throw new Error(error);
	}
};

const starterCodeSubsetsJS = `
// Don't change the function name
function subsets(nums) {
  // Write your code here
};`;

export const subsets: Problem = {
	id: "subsets",
	title: "7. Subsets",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> of <strong>unique</strong> elements, return <em>all possible subsets (the power set)</em>.
  </p>
    <p class='mt-3'>
    The solution set must not contain duplicate subsets. You may return the answer in <strong>any order</strong>.
    </p>
    <p class='mt-3'>
    A <strong>subset</strong> of an array is a selection of elements (possibly none) of the array.
    </p>
  `,

	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3]`,
			outputText: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,
		},
		{
			id: 1,
			inputText: `nums = [0]`,
			outputText: `[[],[0]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10</code></li>
    <li class='mt-2'><code>-10 <= nums[i] <= 10</code></li>
    <li class='mt-2'><code>All the integers of <code>nums</code> are <strong>unique</strong>.</code></li>`,
	starterCode: starterCodeSubsetsJS,
	handlerFunction: subsetsHandler,
	starterFunctionName: "function subsets(",
	order: 7,
};
