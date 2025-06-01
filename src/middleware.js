import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  let city = 'default';

  if (host.includes('localhost')) {
    // e.g. london.localhost or localhost:3000
    const parts = host.split('.');
    if (parts.length >= 2 && !host.startsWith('localhost')) {
      city = parts[0];
    }
  } else {
    const parts = host.split('.');

    // Filter out www if present
    const subdomain = parts.length > 2 ? parts[0] : null;

    if (subdomain && subdomain !== 'www') {
      city = subdomain; // e.g. london.gcity.xyz
    }
  }

  url.searchParams.set('city', city);
  return NextResponse.rewrite(url);
}
