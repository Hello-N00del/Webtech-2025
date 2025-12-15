import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User, Infoletter } from '../models/types';

// Mock-Daten für initiale Infoletter
const mockInfoletters: Infoletter[] = [
  {
    id: '1',
    title: 'Willkommen im Webtech-2025 Forum',
    content: 'Dies ist der erste Thread. Hier können Sie wichtige Informationen und Updates teilen.',
    author: 'Admin',
    authorId: '1',
    createdAt: new Date('2025-12-01'),
    likes: 5,
    category: 'Allgemein',
    replies: 2,
    views: 145,
  },
  {
    id: '2',
    title: 'Frage zu HTML Semantik',
    content: 'Welche HTML-Tags sollte man für moderne semantische Markup verwenden?',
    author: 'WebDev22',
    authorId: '2',
    createdAt: new Date('2025-12-03'),
    likes: 3,
    category: 'HTML',
    replies: 2,
    views: 87,
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox',
    content: 'Was sind die Vor- und Nachteile von CSS Grid im Vergleich zu Flexbox?',
    author: 'DesignNinja',
    authorId: '3',
    createdAt: new Date('2025-12-05'),
    likes: 7,
    category: 'CSS',
    replies: 1,
    views: 132,
  },
  {
    id: '4',
    title: 'JavaScript Event Handling Best Practices',
    content: 'Diskussion über die besten Methoden für Event Handling in modernen JavaScript-Anwendungen.',
    author: 'CodeMaster',
    authorId: '4',
    createdAt: new Date('2025-12-06'),
    likes: 4,
    category: 'JavaScript',
    replies: 2,
    views: 63,
  },
];

export const useAppStore = defineStore('app', () => {
  // State
  const currentUser = ref<User | null>(null);
  const infoletters = ref<Infoletter[]>(mockInfoletters);
  const isAuthenticated = ref(false);

  // Actions
  const login = (username: string, password: string): boolean => {
    // Mock-Login: akzeptiert beliebige Credentials
    if (username && password) {
      const user: User = {
        id: Date.now().toString(),
        username,
        email: `${username}@example.com`,
      };
      currentUser.value = user;
      isAuthenticated.value = true;
      return true;
    }
    return false;
  };

  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
  };

  const addInfoletter = (title: string, content: string) => {
    if (!currentUser.value) return;

    const newInfoletter: Infoletter = {
      id: Date.now().toString(),
      title,
      content,
      author: currentUser.value.username,
      authorId: currentUser.value.id,
      createdAt: new Date(),
      likes: 0,
      category: 'Allgemein',
      replies: 0,
      views: 0,
    };

    infoletters.value = [newInfoletter, ...infoletters.value];
  };

  const likeInfoletter = (id: string) => {
    infoletters.value = infoletters.value.map((infoletter) =>
      infoletter.id === id
        ? { ...infoletter, likes: infoletter.likes + 1 }
        : infoletter,
    );
  };

  return {
    currentUser,
    infoletters,
    isAuthenticated,
    login,
    logout,
    addInfoletter,
    likeInfoletter,
  };
});
