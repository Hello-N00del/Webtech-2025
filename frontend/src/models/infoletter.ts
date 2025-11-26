export interface Infoletter {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  userId: string;
  // Optionales Feld für Ziel-Email, falls später für Versand benötigt
  targetEmail?: string;
}