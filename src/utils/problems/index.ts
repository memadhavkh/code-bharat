import { Problem } from "../types/problem";
import { bestTimeToBuyAndSellStock } from "./best-time-to-bs";
import { containerWithMostWater } from "./container-wth-most-water";
import { jumpGame } from "./jump-game";
import { maxDepthOfBinaryTree } from "./max-depth-of-binary-tree";
import { mergeIntervals } from "./merge-intervals";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { subsets } from "./subsets";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";
interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"two-sum": twoSum,
	"reverse-linked-list": reverseLinkedList,
	"jump-game": jumpGame,
	"search-a-2d-matrix": search2DMatrix,
	"valid-parentheses": validParentheses,
	"best-time-to-buy-and-sell-stock": bestTimeToBuyAndSellStock,
	"container-with-most-water": containerWithMostWater,
	"max-depth-of-binary-tree": maxDepthOfBinaryTree,
	"merge-intervals": mergeIntervals,
	"subsets": subsets,
};