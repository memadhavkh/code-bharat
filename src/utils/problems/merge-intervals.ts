import assert from "assert";
import { Problem } from "../types/problem";

export const mergeIntervalsHandler = (fn: any) => {
	try {
		const tests = [
            [[1,3],[2,6],[8,10],[15,18]],
            [[1,4],[4,5]]
        ];
		const answers = [
            [[1,6],[8,10],[15,18]],
            [[1,5]]
        ];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error) {
		console.error("Error from mergeIntervals Handler: ");
	}
};

const starterCodeMergeIntervalsJS = `
// Don't change the function name
function merge(intervals) {
  // Write your code here
};`;

export const mergeIntervals: Problem = {
	id: "merge-intervals",
	title: "4. Merge Intervals",
	problemStatement: `<p class='mt-3 leading-5'>Given an array of <code class="px-1 py-0.5 font-normal">intervals</code> where <code class="px-1 py-0.5 font-normal">intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input.</em></p>`,
	examples: [
		{
			id: 0,
			inputText: 'intervals = [ [ 1, 3 ], [ 2, 6 ], [ 8, 10 ], [ 15, 18 ] ]',
			outputText: "[ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]",
            explaination: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
		},
		{
			id: 1,
			inputText: 'intervals = [ [ 1, 4 ], [ 4, 5 ] ]',
			outputText: "[ [ 1, 5 ] ]",
            explaination: "Intervals [1,4] and [4,5] are considered overlapping."
		},
	],
	constraints: `<li class='mt-2'><code class="px-1 py-0.5 font-normal">1 <= intervals.length <= 10<sup>4</sup></code></li>
<li class='mt-2 '><code class="px-1 py-0.5 font-normal">intervals[i].length == 2</code></li><li class='mt-2 '><code class="px-1 py-0.5 font-normal">0 <= start<sub>i</sub> <= end<sub>i</sub> <= 10<sup>4</sup></code></li>
`,
    //TODO: type checking
	handlerFunction: mergeIntervalsHandler,
	starterCode: starterCodeMergeIntervalsJS,
	starterFunctionName: "function merge(",
	order: 4,
};
