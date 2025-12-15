// Vue 3 Composable für Datum-Formatierung
export function useFormatDate() {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes <= 1 ? 'gerade eben' : `${minutes} Minuten`;
      }
      return hours === 1 ? '1 Stunde' : `${hours} Stunden`;
    }

    if (days === 1) return '1 Tag';
    if (days === 2) return '2 Tagen';
    if (days === 3) return '3 Tagen';
    if (days === 4) return '4 Tagen';
    if (days === 5) return '5 Tagen';
    if (days === 6) return '6 Tagen';
    if (days < 7) return `${days} Tagen`;

    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatFullDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return { formatDate, formatFullDate };
}
