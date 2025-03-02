import supabase from "@/supabaseClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Pet = {
	title: string;
	contact_at: string;
};

function SeeRfid() {

	const [search_params] = useSearchParams();
	const rfid_val = search_params.get("r");

	const [pet_profile, set_pet_profile] = useState<Pet | "failed" | "loading">("loading");

	useEffect(() => {
		async function fetch_and_update_rfid_data() {
			const { data, error } = await supabase
				.from('rfid')
				.select('pet_id')
				.eq('id', rfid_val)
				.limit(1)
				.single()
			console.log("Matching pet_id is:")
			console.log(data.pet_id);

			if (error) {
				set_pet_profile("failed");
				return;
			}

			const { data: pet_data, error: pet_error } = await supabase
				.from('pets')
				.select('*')
				.eq('pet_id', data.pet_id)
				.limit(1)
				.single()

			if (pet_error) {
				set_pet_profile("failed")
				return
			}
			
			console.log("Matching pet_data is:")
			console.log(pet_data);
			
			try {
				set_pet_profile({title: pet_data.title, contact_at: pet_data.contact_at})
			} catch {
				set_pet_profile("failed");
				return;
			}
		}
		fetch_and_update_rfid_data()
	}, [])

	if (pet_profile === "loading") {
		return <LoadingAnimation />
	}

	if (pet_profile === "failed") {
		return <NotRegistered />
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-[800px] h-[400px] bg-red-500 flex flex-col items-center justify-center">
				<p className="text-4xl">Hello I am {pet_profile.title}! Nice to meet you</p>

				<p>You can contact my owner at: {pet_profile.contact_at}</p>
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