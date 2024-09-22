"use client";
import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';


const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if(success){
			toast.success("Password Reset Email Sent", {theme: "dark"});
		} else {
			toast.error("Failed to send Password Reset Email");
		}
	}
	useEffect(() => {
		if(error) toast.error("Unexpected error. Please try again later");
	} ,[error])
  return (
    <form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 text-white' onSubmit={handleReset}>
			<h3 className='text-xl font-medium '>Reset Password</h3>
			<p className='text-sm  '>
				Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.
			</p>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your email
				</label>
				<input
					type='email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='name@company.com'
				/>
			</div>

			<button
				type='submit'
				className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-linear 
                bg-[#2B4257] hover:bg-[#14202E] `}
			>
				Reset Password
			</button>
		</form>
  )
}

export default ResetPassword