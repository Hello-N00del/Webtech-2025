import { Infoletter } from '../models/types';

// Service für Infoletter-Operationen
export const infoletterService = {
  // Mock-Daten abrufen
  getInfoletters: async (): Promise<Infoletter[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  },

  // Neuen Infoletter erstellen
  createInfoletter: async (
    title: string,
    content: string,
    author: string,
    authorId: string
  ): Promise<Infoletter> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newInfoletter: Infoletter = {
          id: Date.now().toString(),
          title,
          content,
          author,
          authorId,
          createdAt: new Date(),
          likes: 0
        };
        resolve(newInfoletter);
      }, 300);
    });
  },

  // Infoletter liken
  likeInfoletter: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  },

  // Validierung
  validateInfoletter: (title: string, content: string): boolean => {
    return title.trim().length > 0 && content.trim().length > 0;
  }
};
