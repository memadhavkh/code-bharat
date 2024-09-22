"use client";
import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import useWindowSize from "@/hooks/useWindowSize";
import { Problem } from "@/utils/types/problem";
import Confetti from 'react-confetti'
type Props = {
    problem : Problem
}

const WorkSpace: React.FC<Props> = ({ problem }) => {
    const [solved, setSolved] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const {width, height} = useWindowSize();

    return (
        <Split className='split' minSize={0}>
			<ProblemDescription problem={problem} _solved={solved} />
			<div className='bg-dark-fill-2'>
				<Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
				{success && <Confetti gravity={0.3} tweenDuration={3000} width={width - 1} height={height - 1} />}
			</div>
		</Split>
    )
};

export default WorkSpace;