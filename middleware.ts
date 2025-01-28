import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  // Handle POST requests for both success and failure routes
  if (request.method === 'POST' && 
      (request.nextUrl.pathname === '/payment-success' || 
       request.nextUrl.pathname === '/payment-failed')) {
    try {
      const formData = await request.formData()
      const searchParams = new URLSearchParams()

      // Convert form data to URL parameters
      formData.forEach((value, key) => {
        // Ensure the value is properly encoded
        searchParams.append(key, value?.toString() || '')
      })

      // Get the redirect URL with proper base
      const redirectUrl = new URL(request.nextUrl.pathname, request.url)
      redirectUrl.search = searchParams.toString()

      // Create response with cache control
      const response = NextResponse.redirect(redirectUrl, 302)
      response.headers.set('Cache-Control', 'no-store, max-age=0')
      
      return response
    } catch (error) {
      console.error('Middleware error:', error)
      // On error, redirect to payment failed with error message
      const failedUrl = new URL('/payment-failed', request.url)
      failedUrl.searchParams.set('error', 'Payment processing error')
      return NextResponse.redirect(failedUrl, 302)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/payment-success', '/payment-failed']
}
