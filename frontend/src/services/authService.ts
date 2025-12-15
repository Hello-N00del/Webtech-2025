import { LoginCredentials, User } from '../models/types';

// Service für Authentifizierung
export const authService = {
  // Mock-Login Funktion
  login: async (credentials: LoginCredentials): Promise<User | null> => {
    // Simuliere API-Aufruf
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          resolve({
            id: Date.now().toString(),
            username: credentials.username,
            email: `${credentials.username}@example.com`
          });
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  // Logout Funktion
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  },

  // Validierung
  validateCredentials: (username: string, password: string): boolean => {
    return username.length >= 3 && password.length >= 3;
  }
};