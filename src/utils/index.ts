export const joinClassNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
}
