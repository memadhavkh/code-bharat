"use client"
import ProblemsTable from "@/components/ProblemsTable";
import Topbar from "@/components/Topbar";
// import { firestore } from "@/firebase/firebase";
import useHasMounted from "@/hooks/useHasMounted";
// import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  // const [inputs, setInputs] = useState({
  //   id: '',
  //   title: '',
  //   difficulty: '',
  //   category: '',
  //   videoId: '',
  //   order: '',
  //   link: '',
  //   likes: 0,
  //   dislikes: 0
  // });
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // prevent page refresh
  //   const newProblem = {
  //     ...inputs,
  //     order: Number(inputs.order)
  //   };
  //   await setDoc(doc(firestore, "problem", inputs.id), newProblem); // that's how to save a data in a collection named "problems" in firestore
  //   alert('Saved To Firestore')
  // }
  const hasMounted = useHasMounted();
  if(!hasMounted){
    return null;
  }
  return (
  <>
    <main className='bg-[#091235] min-h-screen'>
      <Topbar />
      <h1
        className='text-2xl text-center text-[#dfdfdf] font-sembold tracking-wider
        uppercase mt-10 mb-5'
      >
        Tackle Coding Challenges on Code-Bharat!
      </h1>
      <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
        {loadingProblems && (
          <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}
        </div>
        <table className='text-sm text-left text-[#dfdfdf] sm:w-7/12 w-full max-w-[1200px] mx-auto'>
          {!loadingProblems &&(
            <thead className='text-xs text-[#dfdfdf] uppercase dark:text-[#dfdfdf] border-b '>
              <tr>
                <th scope='col' className='px-1 py-3 w-0 font-medium'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Title
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Difficulty
                </th>

                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Category
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Solution
                </th>
              </tr>
            </thead>
          )}
          <ProblemsTable setLoadingProblems={setLoadingProblems} />
        </table>
    </main>
    {/* temp form
    <form className="p-6 flex flex-col max-w-sm gap-3 bg-colors-dark-gray-7" onSubmit={handleSubmit}>
      <input onChange={handleInputChange} type="text" placeholder="problem id" name='id' /> 
      <input onChange={handleInputChange} type="text" placeholder="title" name='title' /> 
      <input onChange={handleInputChange} type="text" placeholder="difficulty" name='difficulty' /> 
      <input onChange={handleInputChange} type="text" placeholder="category" name='category' /> 
      <input onChange={handleInputChange} type="text" placeholder="order" name='order' /> 
      <input onChange={handleInputChange} type="text" placeholder="videoId?" name='videoId' /> 
      <input onChange={handleInputChange} type="text" placeholder="link?" name='link' /> 
      <button type="submit" className="bg-colors-dark-layer-1 text-colors-dark-label-2">Save To Firestore</button>

    </form> */}
  </>
  );
}
const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};