export function truncateText(text?: string, maxLength: number = 30): string {
    if (!text) return '';
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  }
  