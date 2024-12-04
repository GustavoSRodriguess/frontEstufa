import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const mockUser: User = {
    id: '1',
    name: 'Operador Teste',
    email: 'operador@teste.com',
    role: 'operator'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('auth_token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            // Simular delay da API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock de validação
            if (credentials.email === 'admin@admin.com' && credentials.password === '123456') {
                const token = 'mock_jwt_token';
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user', JSON.stringify(mockUser));
                setUser(mockUser);
            } else {
                throw new Error('Credenciais inválidas');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);