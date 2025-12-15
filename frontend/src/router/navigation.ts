// Navigation Helper für die Anwendung

export type Route = 'login' | 'feed' | 'create';

export interface NavigationState {
  currentRoute: Route;
  history: Route[];
}

export const navigationHelper = {
  getRouteTitle: (route: Route): string => {
    switch (route) {
      case 'login':
        return 'Login';
      case 'feed':
        return 'Infoletter Feed';
      case 'create':
        return 'Neuer Infoletter';
      default:
        return '';
    }
  },

  isProtectedRoute: (route: Route): boolean => {
    return route !== 'login';
  }
};
