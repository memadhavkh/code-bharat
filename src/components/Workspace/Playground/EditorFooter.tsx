import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import React from "react";
import { BsChevronUp } from "react-icons/bs";

type EditorFooterProps = {
	handleSubmit: () => void;
	handleSubmitRun: () => void;
	loadingRun: boolean;
	loadingSubmit: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit, handleSubmitRun, loadingRun, loadingSubmit }) => {
	return (
		<div className='flex bg-colors-dark-layer-1 absolute bottom-0 z-10 w-full'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-colors-dark-fill-3 text-sm hover:bg-colors-dark-fill-2 text-colors-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							<BsChevronUp className='mx-1 fill-colors-dark-gray-6' />
						</div>
					</button>
				</div>
				<div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-colors-dark-fill-3  hover:bg-colors-dark-fill-2 text-colors-dark-label-2 rounded-lg'
						onClick={handleSubmitRun}
					>
						{loadingRun ? (
							<>
							<CircleSkeleton loadingRun={loadingRun} loadingSubmit={loadingSubmit} />
							<CircleSkeleton loadingRun={loadingRun} loadingSubmit={loadingSubmit} />
							<CircleSkeleton loadingRun={loadingRun} loadingSubmit={loadingSubmit} />
							</>
						): "Run"}
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white rounded-lg bg-colors-dark-green-s hover:bg-green-600'
						onClick={handleSubmit}
					>
						{loadingSubmit ? (
							<>
							<CircleSkeleton loadingRun={loadingRun} loadingSubmit={loadingSubmit} />
							<CircleSkeleton loadingRun={loadingRun} loadingSubmit={loadingSubmit} />
							<CircleSkeleton loadingRun={loadingRun} loadingSubmit={loadingSubmit} />
							</>
						): "Submit"}
					</button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;