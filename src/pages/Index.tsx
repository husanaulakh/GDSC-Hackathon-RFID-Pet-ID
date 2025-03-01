
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PawPrint, Search, Smartphone, Radio, Heart, Shield, ArrowRight, MapPin, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import PetCard, { PetData } from '../components/PetCard';

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

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-dots relative overflow-hidden pb-20">
        <div className="layout-container py-16 md:py-28 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-pet-green mr-2"></span>
              Reuniting Lost Pets With Their Families
            </div>
            <h1 className="heading-xl mb-6 text-balance">
              Keep Your Pets Safe <br className="hidden sm:inline" />
              <span className="text-primary">With RFID Technology</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto text-balance">
              PawTrack uses advanced RFID technology to help lost pets find their way home. Our simple, secure system connects pets to their owners faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="btn-primary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/scan" className="btn-secondary">
                <Search className="mr-2 h-4 w-4" />
                Scan a Pet Tag
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-primary to-pet-mint opacity-50 rounded-2xl blur-xl -z-10"></div>
            <div className="glass-card p-8 md:p-10 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-secondary p-3 rounded-full">
                    <Shield className="h-6 w-6 text-pet-blue" />
                  </div>
                  <h3 className="font-medium text-lg">Protected Pets</h3>
                  <p className="text-muted-foreground text-sm">Keep your pets safe with a unique digital identity</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-secondary p-3 rounded-full">
                    <Smartphone className="h-6 w-6 text-pet-purple" />
                  </div>
                  <h3 className="font-medium text-lg">Instant Alerts</h3>
                  <p className="text-muted-foreground text-sm">Get notified immediately if your pet is found</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-secondary p-3 rounded-full">
                    <Heart className="h-6 w-6 text-pet-pink" />
                  </div>
                  <h3 className="font-medium text-lg">Peace of Mind</h3>
                  <p className="text-muted-foreground text-sm">Rest easy knowing your pet can always find home</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding">
        <div className="layout-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How PawTrack Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our pet identification system utilizes cutting-edge RFID technology to create a seamless experience for pet owners and finders alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-6 mb-6">
                  <Radio className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-3 -right-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="heading-sm mb-3">Register Your Pet</h3>
                <p className="text-muted-foreground">
                  Create an account and register your pet's details. We'll provide you with a unique RFID tag.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pet-mint/10 rounded-full p-6 mb-6">
                  <PawPrint className="h-10 w-10 text-pet-mint" />
                </div>
                <div className="absolute -top-3 -right-3 bg-pet-mint text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="heading-sm mb-3">Attach the Tag</h3>
                <p className="text-muted-foreground">
                  Secure the RFID tag to your pet's collar. It's waterproof, durable, and designed to last.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pet-purple/10 rounded-full p-6 mb-6">
                  <Search className="h-10 w-10 text-pet-purple" />
                </div>
                <div className="absolute -top-3 -right-3 bg-pet-purple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="heading-sm mb-3">Quick Reunions</h3>
                <p className="text-muted-foreground">
                  If your pet is found, the finder can scan the tag to access your contact information securely.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/auth" className="btn-primary">
              Register Your Pet Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section-padding bg-secondary">
        <div className="layout-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Reunited With PawTrack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our technology has helped reunite lost pets with their loving owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePets.map((pet) => (
              <motion.div
                key={pet.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/success-stories" className="inline-flex items-center text-primary font-medium hover:underline">
              View More Success Stories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="layout-container">
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient text-white">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative p-8 md:p-16 text-center md:text-left md:flex items-center justify-between">
              <div className="md:max-w-2xl mb-8 md:mb-0">
                <h2 className="heading-lg mb-4">Ready to Protect Your Pet?</h2>
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  Join thousands of pet owners who trust PawTrack to keep their furry family members safe.
                  Get your RFID tag today and gain peace of mind.
                </p>
                <Link to="/auth" className="inline-flex items-center justify-center rounded-md bg-white text-primary px-6 py-3 text-base font-medium shadow-sm hover:bg-white/90 transition-colors">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="hidden md:block">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="relative p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=400" 
                      alt="Happy Dog" 
                      className="rounded-xl w-72 h-72 object-cover" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-secondary">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-lg mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about PawTrack? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Our Address</h3>
                    <p className="text-muted-foreground">123 Pet Avenue, San Francisco, CA 94107</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">support@pawtrack.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Smartphone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="glass-card p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" id="name" className="input-field" placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" id="email" className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea id="message" rows={4} className="input-field min-h-[120px]" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
