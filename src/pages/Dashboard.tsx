
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { 
  PawPrint, User, Bell, Settings, Plus, 
  Search, Filter, Calendar, ArrowRight,
  AlertCircle, CheckCircle
} from 'lucide-react';
import PetCard, { PetData } from '../components/PetCard';
import PetForm from '@/components/AddPetForm';

const samplePets: PetData[] = [
  {
    id: '1',
    name: 'Bella',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '4 years',
    tagId: 'RF-9238-4721',
    status: 'FOUND',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=500',
    lastSeen: 'Yesterday',
    location: 'Central Park, NY',
  },
  {
    id: '2',
    name: 'Max',
    species: 'Cat',
    breed: 'Tabby',
    age: '2 years',
    tagId: 'RF-4378-2901',
    status: 'LOST',
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=500',
    lastSeen: '3 days ago',
    location: 'Downtown, Seattle',
    ownerContact: 'John Doe: (555) 123-4567',
  },
  {
    id: '3',
    name: 'Charlie',
    species: 'Dog',
    breed: 'Beagle',
    age: '3 years',
    tagId: 'RF-7623-1054',
    status: 'HOME',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500',
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  const [showAddPet, setShowAddPet] = useState<boolean>(false);

  const filteredPets = samplePets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        pet.tagId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'lost') return pet.status === 'LOST' && matchesSearch;
    if (activeTab === 'found') return pet.status === 'FOUND' && matchesSearch;
    if (activeTab === 'home') return pet.status === 'HOME' && matchesSearch;
    
    return matchesSearch;
  });

  const handlePetClick = (pet: PetData) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="bg-pattern min-h-screen">
        <div className="layout-container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-28">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-secondary rounded-full p-3">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Pet Owner</p>
                  </div>
                </div>
                
                <nav className="space-y-1 mb-8">
                  <button className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-foreground bg-secondary">
                    <PawPrint className="h-5 w-5 mr-3 text-primary" />
                    My Pets
                  </button>
                  {/* <button className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60">
                    <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
                    Notifications
                  </button>
                  <button className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60">
                    <Settings className="h-5 w-5 mr-3 text-muted-foreground" />
                    Settings
                  </button> */}
                </nav>
                
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Quick Stats</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Pets</p>
                      <p className="text-2xl font-semibold">{samplePets.length}</p>
                    </div>
                    <div className="p-3 bg-pet-lost/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Lost</p>
                      <p className="text-2xl font-semibold text-pet-lost">
                        {samplePets.filter(p => p.status === 'LOST').length}
                      </p>
                    </div>
                    <div className="p-3 bg-pet-found/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Found</p>
                      <p className="text-2xl font-semibold text-pet-found">
                        {samplePets.filter(p => p.status === 'FOUND').length}
                      </p>
                    </div>
                    <div className="p-3 bg-pet-blue/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Safe</p>
                      <p className="text-2xl font-semibold text-pet-blue">
                        {samplePets.filter(p => p.status === 'HOME').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <h1 className="text-2xl font-semibold">My Pets</h1>
                  <button className="btn-primary inline-flex whitespace-nowrap" onClick={() => setShowAddPet(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Pet
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search pets by name or tag ID..."
                      className="input-field pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </button>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex -mb-px space-x-8">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === 'all'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                      }`}
                    >
                      All Pets
                    </button>
                    <button
                      onClick={() => setActiveTab('lost')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                        activeTab === 'lost'
                          ? 'border-pet-lost text-pet-lost'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                      }`}
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Lost
                    </button>
                    <button
                      onClick={() => setActiveTab('found')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                        activeTab === 'found'
                          ? 'border-pet-found text-pet-found'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                      }`}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Found
                    </button>
                    <button
                      onClick={() => setActiveTab('home')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === 'home'
                          ? 'border-pet-blue text-pet-blue'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                      }`}
                    >
                      Home
                    </button>
                  </div>
                </div>
                
                {filteredPets.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-secondary inline-flex rounded-full p-3 mb-4">
                      <PawPrint className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No pets found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm
                        ? `No pets match your search for "${searchTerm}"`
                        : "You don't have any pets in this category yet"}
                    </p>
                    <button className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Pet
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredPets.map((pet) => (
                      <motion.div
                        key={pet.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <PetCard pet={pet} onClick={() => handlePetClick(pet)} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Recent Activities</h2>
                  <button className="text-primary text-sm hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50">
                    <div className="bg-pet-blue/10 p-2 rounded-full">
                      <Search className="h-4 w-4 text-pet-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Tag Scanned</h4>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Max's tag was scanned in Downtown, Seattle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50">
                    <div className="bg-pet-purple/10 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-pet-purple" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Status Updated</h4>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Bella's status changed from Lost to Found</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50">
                    <div className="bg-pet-green/10 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-pet-green" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Reminder</h4>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Charlie's vaccination is due next week</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                    Show More Activities
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={() => setShowAddPet(false)}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl shadow-raised max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold">Add a New Pet</h2>
                <button onClick={() => setShowAddPet(false)} className="p-1 rounded-full hover:bg-secondary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <PetForm />
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Pet Detail Modal */}
      {showModal && selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl shadow-raised max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold">Pet Details</h2>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-secondary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <PetCard pet={selectedPet} isDetailed />
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="btn-primary">
                  Edit Pet Information
                </button>
                {selectedPet.status === 'HOME' ? (
                  <button className="inline-flex items-center justify-center rounded-md bg-pet-lost text-white h-12 px-6 font-medium">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Report as Lost
                  </button>
                ) : selectedPet.status === 'LOST' ? (
                  <button className="inline-flex items-center justify-center rounded-md bg-pet-found text-white h-12 px-6 font-medium">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Found
                  </button>
                ) : (
                  <button className="inline-flex items-center justify-center rounded-md bg-pet-blue text-white h-12 px-6 font-medium">
                    <PawPrint className="mr-2 h-4 w-4" />
                    Mark as Home
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
