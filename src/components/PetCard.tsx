
import React from 'react';
import { PawPrint, Calendar, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

// export interface PetData {
//   id: string;
//   name: string;
//   species: string;
//   breed?: string;
//   age?: string;
//   tagId: string;
//   status: 'FOUND' | 'LOST' | 'HOME';
//   image?: string;
//   lastSeen?: string;
//   ownerContact?: string;
//   location?: string;
// }

export interface PetData {
  user_id: string;
  pet_id: string;
  title: string;
  description: string;
  contact_at: string;
  photo: string;
  status: 'FOUND' | 'LOST' | 'HOME';
}

interface PetCardProps {
  pet: PetData;
  isDetailed?: boolean;
  onClick?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, isDetailed = false, onClick }) => {
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

  return (
    <div 
      className={`glass-card transition-all duration-300 ${
        onClick ? 'hover:shadow-raised cursor-pointer' : ''
      } ${isDetailed ? 'p-6' : 'p-4'}`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`relative ${isDetailed ? 'md:w-1/3' : 'w-full md:w-1/4'}`}>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
            {pet.photo ? (
              <img 
                src={pet.photo} 
                alt={pet.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PawPrint className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
          </div>
          <div className={`absolute top-2 right-2 ${statusColors[pet.status]} px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
            {statusIcon[pet.status]}
            {pet.status}
          </div>
        </div>
        
        <div className={`flex-1 ${isDetailed ? '' : 'space-y-2'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-semibold ${isDetailed ? 'text-2xl' : 'text-lg'}`}>{pet.title}</h3>
            <div className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{pet.pet_id}</div>
          </div>
          
          {/* <div className="text-muted-foreground text-sm mb-3">
            {pet.species}{pet.breed ? ` • ${pet.breed}` : ''}
            {pet.age ? ` • ${pet.age}` : ''}
          </div> */}
          
          {(pet.status === 'LOST' || isDetailed) && (
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last seen: in Coquitlam</span>
            </div>
          )}
          
          {(pet.status === 'LOST' || isDetailed) && (
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{"Coquitlam"}</span>
            </div>
          )}
          
          {isDetailed && (
            <div className="mt-4 space-y-4">
              {pet.contact_at && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                  <p className="text-sm bg-secondary p-3 rounded-md">{pet.contact_at}</p>
                </div>
              )}
              
              {pet.status === 'LOST' && (
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
              
              {pet.status === 'FOUND' && (
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
  );
};

export default PetCard;
