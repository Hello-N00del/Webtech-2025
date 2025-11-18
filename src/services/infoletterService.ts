import type { Infoletter } from '../models/infoletter';

// Dummy (Mock) Funktionen, später mit API Calls ersetzen
export function fetchInfoletters(): Promise<Infoletter[]> {
  // Hier könnte per fetch/axios aktuelle Infoletter geladen werden
  return Promise.resolve([]);
}

export function createInfoletter(data: Infoletter): Promise<Infoletter> {
  return Promise.resolve(data);
}