import { useState } from 'react';
import { Upload, Image, Text } from 'lucide-react';
import supabase from '@/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const USER_UUID = "d695a227-daf7-4bd9-8915-367a66edc789"

export default function PetForm() {
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [formData, setFormData] = useState({
        user_id: USER_UUID,
        pet_id: uuidv4(),
        title: '',
        description: '',
        contact_at: '',
        photo: '',
        status: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageURL(URL.createObjectURL(e.target.files[0]));
            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                // Get the base64 string from the reader result
                const base64String = reader.result as string;
                setFormData({ ...formData, photo: base64String });
                console.log(formData);
            };
    
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
    
            reader.readAsDataURL(file); // Read the file as base64
        }
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log(formData);
            const data = await supabase.from("pets").insert(formData);
            console.log("ADD NEW PET SUBMIT");
            console.log(data.error);
        } catch (error) {
            console.error("Add Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>


        {!loading && 
            <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white shadow-lg rounded-lg">
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                value={formData.title} 
                onChange={handleChange} 
                className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            />
            <input 
                type="text"
                name="contact_at" 
                placeholder="Contact At:" 
                value={formData.contact_at} 
                onChange={handleChange} 
                className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            />
            <select
                name='status'
                onChange={handleChange}
                className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            >
                <option value="">Select Status</option>
                <option value="LOST">Lost</option>
                <option value="FOUND">Found</option>
                <option value="SAFE">Safe</option>
            </select>
                <textarea
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
                />
            <div className="col-span-2 flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-100">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <Upload className="h-5 w-5" />
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {formData.photo && <img src={imageURL} alt="Preview" className="mt-4 h-24 w-24 object-cover rounded-md" />}
            </div>
            <button type="submit" className="col-span-2 bg-pet-blue text-white h-12 rounded-md font-medium hover:bg-blue-700"
            onClick={handleSubmit}>Submit</button>
            
        </form>
                
        }
        </div>
    );
}
