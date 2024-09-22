import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import ResetPassword from '../Auth/ResetPassword'

type Props = {
	isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<Props> = ({isOpen, onClose}) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [onClose]);
  return (
    <>
			<div
				className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-[1000]'
				onClick={onClose}
			></div>
			<div className='w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex z-[1001] justify-center items-center'>
				<div className='relative w-full h-full mx-auto flex items-center justify-center'>
					<div className='bg-[#091235] rounded-lg shadow relative w-full mx-6'>
						<div className='flex justify-end p-2'>
							<button
								type='button'
								className='bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-[#88A9C3]'
								onClick={onClose}
							>
								<IoClose className='h-5 w-5' />
							</button>
						</div>
						{isOpen === true  &&<ResetPassword />}
					</div>
				</div>
			</div>
		</>
  )
}
export default AuthModal;
