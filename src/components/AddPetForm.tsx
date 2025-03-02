import { useState } from 'react';
import { Upload, Image, Text } from 'lucide-react';

export default function PetForm() {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        owner: '',
        image: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
        }
    };

    return (
        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white shadow-lg rounded-lg">
            <input 
                type="text" 
                name="name" 
                placeholder="Pet Name" 
                value={formData.name} 
                onChange={handleChange} 
                className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            />
            <input 
                type="text" 
                name="breed" 
                placeholder="Breed" 
                value={formData.breed} 
                onChange={handleChange} 
                className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            />
            <input 
                type="text" 
                name="age" 
                placeholder="Age" 
                value={formData.age} 
                onChange={handleChange} 
                className="h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pet-blue" 
            />
            <input 
                type="text" 
                name="owner" 
                placeholder="Owner Name" 
                value={formData.owner} 
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
            <button type="submit" className="col-span-2 bg-pet-blue text-white h-12 rounded-md font-medium hover:bg-blue-700">Submit</button>
        </form>
    );
}
