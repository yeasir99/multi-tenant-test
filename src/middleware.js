import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  let city = 'default';

  if (host.includes('localhost')) {
    const parts = host.split('.');
    // Example: london.localhost:3000 → ['london', 'localhost:3000']
    if (parts.length >= 2 && !host.startsWith('localhost')) {
      city = parts[0]; // subdomain before localhost
    }
  } else if (host.includes('vercel')) {
    const parts = host.split('.');
    if (parts.length >= 4) {
      city = parts[0];
    }
  } else {
    // For production domains like city.example.com
    const parts = host.split('.');
    if (parts.length >= 3) {
      city = parts[0];
    }
  }

  url.searchParams.set('city', city);

  return NextResponse.rewrite(url);
}
