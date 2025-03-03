
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { PawPrint, Mail, Lock, User, ArrowRight, Facebook, Twitter } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Auth data:', { email, password, name: !isLogin ? name : undefined });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Layout>
      <div className="layout-container section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-primary to-pet-mint opacity-30 rounded-2xl blur-xl -z-10"></div>
                <div className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-glass">
                  <img 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600" 
                    alt="Pet with owner" 
                    className="w-full h-auto rounded-xl object-cover" 
                  />
                </div>
              </motion.div>
              <div className="mt-8 space-y-6 pl-4">
                <h2 className="heading-md">Why Join PawTrackr?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mt-1 mr-4">
                      <PawPrint className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Protect Your Pets</h3>
                      <p className="text-muted-foreground text-sm">
                        Register your pets and keep them safe with our advanced RFID technology.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-pet-mint/10 p-2 rounded-full mt-1 mr-4">
                      <PawPrint className="h-4 w-4 text-pet-mint" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Quick Recovery</h3>
                      <p className="text-muted-foreground text-sm">
                        If your pet goes missing, our system helps ensure a fast and safe return.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-pet-purple/10 p-2 rounded-full mt-1 mr-4">
                      <PawPrint className="h-4 w-4 text-pet-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Peace of Mind</h3>
                      <p className="text-muted-foreground text-sm">
                        Join thousands of pet owners who trust PawTrackr with their furry family members.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="glass-card p-8">
                  <div className="text-center mb-8">
                    <h1 className="heading-md mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
                    <p className="text-muted-foreground">
                      {isLogin
                        ? 'Sign in to access your pet profiles and account'
                        : 'Join PawTrackr to keep your pets safe and secure'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field pl-11"
                            placeholder="Your name"
                            required={!isLogin}
                          />
                          <div className="absolute left-0 top-0 h-full flex items-center justify-center w-11 pointer-events-none">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input-field pl-11"
                          placeholder="your@email.com"
                          required
                        />
                        <div className="absolute left-0 top-0 h-full flex items-center justify-center w-11 pointer-events-none">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="block text-sm font-medium">
                          Password
                        </label>
                        {isLogin && (
                          <a href="#" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input-field pl-11"
                          placeholder="••••••••"
                          required
                        />
                        <div className="absolute left-0 top-0 h-full flex items-center justify-center w-11 pointer-events-none">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full mt-6">
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                      >
                        <Facebook className="h-5 w-5 mr-2 text-[#1877F2]" />
                        Facebook
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                      >
                        <Twitter className="h-5 w-5 mr-2 text-[#1DA1F2]" />
                        Twitter
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="ml-1 text-primary hover:underline font-medium"
                      >
                        {isLogin ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
