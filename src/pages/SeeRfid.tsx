import supabase from "@/supabaseClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PawPrint, Calendar, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

export interface PetData {
	user_id: string;
	pet_id: string;
	title: string;
	description: string;
	contact_at: string;
	photo: string;
	status: 'FOUND' | 'LOST' | 'HOME';
}

function SeeRfid() {

	const statusColors = {
		FOUND: 'bg-pet-found/10 text-pet-found',
		LOST: 'bg-pet-lost/10 text-pet-lost',
		HOME: 'bg-pet-blue/10 text-pet-blue',
	};

	const statusIcon = {
		FOUND: <CheckCircle className="h-4 w-4 mr-1" />,
		LOST: <AlertCircle className="h-4 w-4 mr-1" />,
		HOME: <PawPrint className="h-4 w-4 mr-1" />,
	};

	const [search_params] = useSearchParams();
	const rfid_val = search_params.get("r");

	const [pet_profile, set_pet_profile] = useState<PetData | "failed" | "loading">("loading");

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
				set_pet_profile({
					user_id: pet_data.user_id,
					pet_id: pet_data.pet_id,
					title: pet_data.title,
					description: pet_data.description,
					contact_at: pet_data.contact_at,
					status: pet_data.status,
					photo: pet_data.photo
				})

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

	const isDetailed = true

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-[800px] h-[400px] flex flex-col items-center justify-center">
			<div className="flex flex-col md:flex-row gap-4">
				<div className={`relative ${isDetailed ? 'md:w-1/3' : 'w-full md:w-1/4'}`}>
					<div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
						{pet_profile.photo ? (
							<img
								src={pet_profile.photo}
								alt={pet_profile.title}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">
								<PawPrint className="h-12 w-12 text-muted-foreground/50" />
							</div>
						)}
					</div>
					<div className={`absolute top-2 right-2 ${statusColors[pet_profile.status]} px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
						{statusIcon[pet_profile.status]}
						{pet_profile.status}
					</div>
				</div>

				<div className={`flex-1 ${isDetailed ? '' : 'space-y-2'}`}>
					<div className="flex justify-between items-start mb-2">
						<h3 className={`font-semibold ${isDetailed ? 'text-2xl' : 'text-lg'}`}>{pet_profile.title}</h3>
						<div className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{pet_profile.pet_id}</div>
					</div>

					{/* <div className="text-muted-foreground text-sm mb-3">
			  {pet.species}{pet.breed ? ` • ${pet.breed}` : ''}
			  {pet.age ? ` • ${pet.age}` : ''}
			</div> */}

					{(pet_profile.status === 'LOST' || isDetailed) && (
						<div className="flex items-center text-sm text-muted-foreground mt-2">
							<Calendar className="h-4 w-4 mr-2" />
							<span>Last seen: in Coquitlam</span>
						</div>
					)}

					{(pet_profile.status === 'LOST' || isDetailed) && (
						<div className="flex items-center text-sm text-muted-foreground mt-2">
							<MapPin className="h-4 w-4 mr-2" />
							<span>{"Coquitlam"}</span>
						</div>
					)}

					{isDetailed && (
						<div className="mt-4 space-y-4">
							{pet_profile.contact_at && (
								<div>
									<h4 className="text-sm font-medium mb-1">Contact Information</h4>
									<p className="text-sm bg-secondary p-3 rounded-md">{pet_profile.contact_at}</p>
								</div>
							)}

							{pet_profile.status === 'LOST' && (
								<div className="bg-pet-lost/5 border border-pet-lost/20 rounded-md p-4">
									<h4 className="text-sm font-medium flex items-center text-pet-lost mb-2">
										<AlertCircle className="h-4 w-4 mr-2" />
										This pet is currently lost
									</h4>
									<p className="text-sm text-muted-foreground">
										If you have found this pet, please contact the owner immediately using the information above.
									</p>
								</div>
							)}

							{pet_profile.status === 'FOUND' && (
								<div className="bg-pet-found/5 border border-pet-found/20 rounded-md p-4">
									<h4 className="text-sm font-medium flex items-center text-pet-found mb-2">
										<CheckCircle className="h-4 w-4 mr-2" />
										This pet has been found
									</h4>
									<p className="text-sm text-muted-foreground">
										The owner has been notified and is working to reunite with their pet.
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
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