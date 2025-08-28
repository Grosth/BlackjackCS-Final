import { useState, useEffect } from 'react';
import { User } from '../types/game';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('blackjack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - in real app, this would be a Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: Math.random().toString(36),
        email,
        username: email.split('@')[0],
        chips: 1000,
        wins: 0,
        losses: 0,
        ties: 0,
        created_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('blackjack_user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36),
        email,
        username,
        chips: 1000, // Starting chips
        wins: 0,
        losses: 0,
        ties: 0,
        created_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('blackjack_user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Error al registrarse. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blackjack_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('blackjack_user', JSON.stringify(updatedUser));
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser
  };
};