import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/auth.service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      setLoading(true);
      const isAuth = await authService.isAuthenticated();
      
      if (isAuth) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          setAuthenticated(true);
        } else {
          // Token existe mas usuário não - limpa tudo
          await authService.logout();
          setUser(null);
          setAuthenticated(false);
        }
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, senha) => {
    try {
      const { usuario } = await authService.login(email, senha);
      setUser(usuario);
      setAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer login' 
      };
    }
  };

  const signUp = async (userData) => {
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer cadastro' 
      };
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      setAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer logout' 
      };
    }
  };

  const updateUser = async (userData) => {
    try {
      await authService.updateCurrentUser(userData);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao atualizar usuário' 
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
