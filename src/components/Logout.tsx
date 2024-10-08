import { auth } from "@/firebase/firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";

const Logout= () => {
	const [signOut] = useSignOut(auth);

	const handleLogout = () => {
		signOut();
	};
	return (
		<button className='bg-colors-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-[#dfdfdf]' onClick={handleLogout}>
			<FiLogOut />
		</button>
	);
};
export default Logout;