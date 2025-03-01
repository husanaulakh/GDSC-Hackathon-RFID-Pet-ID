import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Pet = {
	name: string;
	owner_contact: string;
};

function SeeRfid() {

	const [search_params] = useSearchParams();
	const rfid_val = search_params.get("rfid");
	
	const [pet_profile, set_pet_profile] = useState<Pet | "failed" | "loading">("loading");
	const [loading, set_loading] = useState<boolean>(true);

	useEffect(() => {
		if (rfid_val === "rfid-1") {
			set_pet_profile({name: "Rufus", owner_contact: "+1 123 456 7890"})
		} else {
			set_pet_profile("failed")
		}
	}, [])

	if (pet_profile === "loading") {
		return <LoadingAnimation/>
	}

	if (pet_profile === "failed") {
		return <NotRegistered/>
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-[800px] h-[400px] bg-red-500 flex flex-col items-center justify-center">
				<p className="text-4xl">Hello I am {pet_profile.name}! Nice to meet you</p>

				<p>You can contact my owner at: {pet_profile.owner_contact}</p>
			</div>
		</div>
	)
}

function NotRegistered() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-[800px] h-[400px] bg-red-500 flex flex-col items-center justify-center">
				<p className="text-4xl">No pet has this tag 🐾</p>
			</div>
		</div>
	);
}

function LoadingAnimation() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-[800px] h-[400px] bg-yellow-500 flex flex-col items-center justify-center">
				<p className="text-4xl">Getting this pets info 😝</p>
				<img className="h-[48px] m-8" src="/loading.gif" />
			</div>
		</div>
	);
}

export default SeeRfid;