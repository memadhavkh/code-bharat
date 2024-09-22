import { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark} from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { usePathname } from "next/navigation";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import useHasMounted from "@/hooks/useHasMounted";


type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	// State variables
	const [activeTestCaseId, setActiveTestCaseId] = useState(0);
	const [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [fontSize] = useLocalStorage("fontSize", "16px");
	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});
	const [loading1, setLoading1] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const path: string = usePathname().toString();
	
	// Firebase Auth
	const [user] = useAuthState(auth);
	
	// Custom hook to prevent SSR issues
	const hasMounted = useHasMounted();
	
	// Ensure the router is accessed after mounting
	const [pid, setPid] = useState<string |undefined>();
	useEffect(() => {
		setPid(path.slice(10, path.length));
	}, [path]);

	// Effect to get code from localStorage
	useEffect(() => {
		if (hasMounted && pid) {
			const code = localStorage.getItem(`code-${pid}`);
			if (user) {
				setUserCode(code ? JSON.parse(code) : problem.starterCode);
			} else {
				setUserCode(problem.starterCode);
			}
		}
	}, [pid, user, problem.starterCode, hasMounted]);

	// Handle code change and store in localStorage
	const onChange = (value: string) => {
		setUserCode(value);
		if (pid) {
			localStorage.setItem(`code-${pid}`, JSON.stringify(value));
		}
	};

	// Handle code submission
	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", { position: "top-center", autoClose: 3000, theme: "dark" });
			return;
		}
		try {
			setLoading2(true);
			const userCodeModified = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			setUserCode(userCodeModified);
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string]?.handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!", { position: "top-center", autoClose: 3000, theme: "dark" });
					setSuccess(true);
					setTimeout(() => setSuccess(false), 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
					setLoading2(false);
				}
			}
		} catch (error: any) {
			const errorMessage = error.message as string;
			if (errorMessage.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
				toast.error("Oops! One or more test cases failed", { position: "top-center", autoClose: 3000, theme: "dark" });
			} else {
				toast.error(errorMessage, { position: "top-center", autoClose: 3000, theme: "dark" });
			}
			setLoading2(false);
		}
	};
	const handleSubmitRun = async () => {
		if (!user) {
		toast.error("Please login to submit your code", { position: "top-center", autoClose: 3000, theme: "dark" });
		return;
		}
		try {
			setLoading1(true);
			const userCodeModified = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			setUserCode(userCodeModified);
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string]?.handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("All tests passed! Submit The Problem", { position: "top-center", autoClose: 3000, theme: "dark" });

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
					setLoading1(false);
				}
			}
		} catch (error: any) {
			const errorMessage = error.message as string;
			if (errorMessage.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
				toast.error("Oops! One or more test cases failed", { position: "top-center", autoClose: 3000, theme: "dark" });
			} else {
				toast.error(errorMessage, { position: "top-center", autoClose: 3000, theme: "dark" });
			}
			setLoading1(false);
	}}

	// Prevent rendering if the router hasn't mounted yet
	if (!hasMounted) {
		return null;
	}

	return (
		<div className="flex flex-col bg-[#111] relative overflow-x-hidden">
			<PreferenceNav settings={settings} setSettings={setSettings} />
			<Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[50, 50]} minSize={60}>
				<div className="w-full overflow-auto">
					<CodeMirror
						value={userCode}
						theme={vscodeDark}
						onChange={onChange}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
					/>
				</div>
				<div className="w-full px-5 overflow-auto">
					<div className="flex h-10 items-center space-x-6">
						<div className="relative flex h-full flex-col justify-center cursor-pointer">
							<div className="text-sm font-medium leading-5 text-white">Testcases</div>
							<hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
						</div>
					</div>

					<div className="flex">
						{problem.examples.map((example, index) => (
							<div
								className="mr-2 items-start mt-2"
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className="flex flex-wrap items-center gap-y-4">
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-colors-dark-fill-3 hover:bg-colors-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="font-semibold my-4">
						<p className="text-sm font-medium mt-4 text-white">Input:</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-colors-dark-fill-3 border-transparent text-[#dfdfdf] mt-2">
							{problem.examples[activeTestCaseId].inputText}
						</div>
						<p className="text-sm font-medium mt-4 text-white">Output:</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-colors-dark-fill-3 border-transparent text-[#dfdfdf] mt-2">
							{problem.examples[activeTestCaseId].outputText}
						</div>
					</div>
				</div>
			</Split>
			<EditorFooter loadingRun={loading1} loadingSubmit={loading2} handleSubmit={handleSubmit} handleSubmitRun={handleSubmitRun} />
		</div>
	);
};

export default Playground;
