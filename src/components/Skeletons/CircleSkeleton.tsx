import React from "react";

type Props = {
	loadingRun?: boolean,
	loadingSubmit?: boolean
}

const CircleSkeleton: React.FC<Props> = ({loadingRun, loadingSubmit}) => {
	return (
		<div className='space-y-2.5 animate-pulse max-w-lg'>
			<div className='flex items-center w-full space-x-2'>
				<div className={` ${loadingRun || loadingSubmit ? "w-1.5 h-1.5 mr-2": "w-6 h-6"} rounded-full bg-colors-dark-fill-3`}></div>
			</div>
		</div>
	);
};
export default CircleSkeleton;