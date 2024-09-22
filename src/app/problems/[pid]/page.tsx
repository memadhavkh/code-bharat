import Topbar from "@/components/Topbar";
import WorkSpace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import React from "react";

// Page Component (Server Component by default)
const ProblemPage = async ({ params }: { params: { pid: string } }) => {
    const { pid } = params;
    console.log(pid);
    const problem: Problem | undefined = problems[pid];

    if (!problem) {
        return <div className="text-white">Problem not found</div>;
    }

    // Convert the handler function to string before sending to client
    const problemWithSerializedFunction = {
        ...problem,
        handlerFunction: problem.handlerFunction.toString(),
    };

    return (
        <div>
            <Topbar problemPage={true} />
            {/* Pass the serialized function */}
            <WorkSpace problem={problemWithSerializedFunction} />
        </div>
    );
};

export default ProblemPage;

// Static paths generation (same as before)
export async function generateStaticParams() {
    return Object.keys(problems).map((pid) => ({
        pid,
    }));
}
