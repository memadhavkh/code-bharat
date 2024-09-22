import assert from "assert";
import { Problem } from "../types/problem";
import example from "./images/container-1.jpg";

export const containerHandler = (fn: unknown) => {
	try {
		const tests = [
            [1,8,6,2,5,4,8,3,7],
            [1,1]
        ];
		const answers = [49, 1];
		for (let i = 0; i < tests.length; i++) {
			if(typeof fn === "function") {
				const result = fn(tests[i]);
			assert.equal(result, answers[i]);
			return true;
			}
		}
		return false;
	} catch (error: unknown) {
		console.log("Error from ContainerHandler: ", error);
		return false;
	}
};

const starterCodeContainerWithMostWaterJS = `
// Do not edit function name
function maxArea(height) {
  // Write your code here
};`;

export const containerWithMostWater: Problem = {
	id: "container-with-most-water",
	title: "3. Container With Most Water",
	problemStatement: `<p class='mt-3'>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>ith</code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
    <p class='mt-3'>
    Find two lines that together with the x-axis form a container, such that the container contains the most water.
    </p>
    <p class='mt-3'>Return <em>the maximum amount of water a container can store.</em>
    </p>
    <p class='mt-3'>
    <strong>Notice</strong> that you may not the slant the container.
    </p>
	`,
	examples: [
		{
			id: 0,
			inputText: "height = [1,8,6,2,5,4,8,3,7]",
			outputText: "49",
			img: example.src,
		},
		{
			id: 1,
			inputText: "height = [1,1]",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>n == height.length</code></li>
<li class='mt-2'><code>2 <= n <= 10<sup>5</sup></code></li>
<li class='mt-2'><code>0 <= height[i] <= 10<sup>4</sup></code></li>`,
	starterCode: starterCodeContainerWithMostWaterJS,
	handlerFunction: containerHandler,
	starterFunctionName: "function maxArea(",
	order: 3,
};
