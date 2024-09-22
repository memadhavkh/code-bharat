import assert from "assert";
import { Problem } from "../types/problem";

export const bestTimeHandler = (fn: unknown) => {
	try {
		const tests = [
			[7, 1, 5, 3, 6, 4],
			[7, 6, 4, 3, 1]
		];
		const answers = [5, 0];
		for (let i = 0; i < tests.length; i++) {
			if(typeof fn === "function") {
				const result = fn(tests[i]);
				assert.equal(result, answers[i]);
				return true;
			}
		}
		return false;
	} catch (error: unknown) {
		console.log("Error from best-time-to-bs Handler: ", error);
		return false;
	}
};

const starterCodeBestTimeJS = `function maxProfit(prices) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStock: Problem = {
	id: "best-time-to-buy-and-sell-stock",
	title: "6. Best Time To Buy and Sell Stock",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>ith</code> day.
  </p>
    <p class='mt-3'>
    You want to maximise your profit by choosing a <strong>single day</strong> to buy one stock and choosing <strong>different day in the future</strong> to sell that stock.
    </p>
    <p class='mt-3'>
    Return the <i>maximum profit you can achieve from this transaction</i>. If you cannot achieve any profit, return <code>0</code>
    </p>
  `,

	examples: [
		{
			id: 0,
			inputText: `prices = [7,1,5,3,6,4]`,
			outputText: `5`,
			explaination: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. <br/>Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
		},
		{
			id: 1,
			inputText: `prices = [7,6,4,3,1]`,
			outputText: `0`,
			explaination:
				"In this case, no transactions are done and the max profit = 0.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= prices.length <= 10<sup>5</sup></code></li>
    <li class='mt-2'><code>0 <= prices[i] <= 10<sup>4</sup></code></li>`,
	starterCode: starterCodeBestTimeJS,
	handlerFunction: bestTimeHandler,
	starterFunctionName: "function maxProfit(",
	order: 6,
};
