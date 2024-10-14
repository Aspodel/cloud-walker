export const joinClassNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side
    return '';
  }
  // Server-side
  const host = process.env.VERCEL_URL || 'localhost:3000';
  return `http${host.includes('localhost') ? '' : 's'}://${host}`;
}
