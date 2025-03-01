import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SeeRfid() {

	const [search_params] = useSearchParams();
	const rfid_val = search_params.get("rfid");

	const [loading, set_loading] = useState<boolean>(true);

	if (loading) {
		return <LoadingAnimation/>
	}

	return (
		<>
			{rfid_val === "not-found" ? (
				<NotRegistered />
			) : (
				<div>RFID Value: {rfid_val}</div>
			)}
		</>
	)
}

function NotRegistered() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-[800px] h-[400px] bg-red-500 flex flex-col items-center justify-center">
				<p className="text-4xl">No pet has this tag 🐾</p>
				<img className="h-[48px] m-8" src="/loading.gif" />
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