import { useState } from 'react';
import { Upload, Image, Text } from 'lucide-react';
import supabase from '@/supabaseClient';

export default function PetForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contact_at: '',
        image: '',
        status: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
            console.log(formData);
        }
    };

    const handleSubmit = () => {
        supabase.from("user_pets").insert(formData);
    }

    return (
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
            className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            >
                <option value="">Select Status</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
                <option value="safe">Safe</option>
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
                {formData.image && <img src={formData.image} alt="Preview" className="mt-4 h-24 w-24 object-cover rounded-md" />}
            </div>
            <button type="submit" className="col-span-2 bg-pet-blue text-white h-12 rounded-md font-medium hover:bg-blue-700"
            onClick={() => handleSubmit}>Submit</button>
        </form>
    );
}
