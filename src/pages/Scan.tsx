import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Search, AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PetCard, { PetData } from '../components/PetCard';

const Scan = () => {
  const [showResult, setShowResult] = useState(false);
  const [tagId, setTagId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    if (!tagId) {
      setErrorMessage('Please enter a valid tag ID');
    } else {
      setErrorMessage('');
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setTagId('');
    setShowResult(false);
    setErrorMessage('');
  };

  return (
    <Layout>
      <div className="layout-container section-padding">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="heading-lg mb-4">Search Pet Tag</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Found a pet? Enter their tag ID to view their information and contact their owner.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8">
            {!showResult ? (
              <div className="space-y-8">
                <div className="relative">
                  <label htmlFor="tagId" className="block text-sm font-medium mb-1">Tag ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="tagId"
                      value={tagId}
                      onChange={(e) => setTagId(e.target.value)}
                      placeholder="e.g. RF-0000-0000"
                      className="input-field pl-11"
                    />
                    <div className="absolute left-0 top-0 h-full flex items-center justify-center w-11 pointer-events-none">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="mt-2 text-sm text-pet-red flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errorMessage}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSearch}
                    className="btn-primary"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Find Pet
                  </button>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Pet Information</h2>
                    <button
                      onClick={handleReset}
                      className="text-primary text-sm flex items-center hover:underline"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Search Again
                    </button>
                  </div>
                  
                  <PetCard pet={samplePet} isDetailed />
                  
                  {samplePet.status === 'LOST' && (
                    <div className="mt-8 bg-pet-found/5 border border-pet-found/20 rounded-md p-4">
                      <h3 className="text-base font-medium mb-2">Have you found this pet?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Please contact the owner using the information above, or report the pet as found below.
                      </p>
                      <button className="inline-flex items-center justify-center rounded-md bg-pet-found text-white px-4 py-2 text-sm font-medium hover:bg-pet-found/90 transition-colors">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Report Pet as Found
                      </button>
                    </div>
                  )}
                </motion.div> */}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
