import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      // Robust role/admin check
      const userEmail = auth?.user?.email || (auth as any)?.email;
      const userRole = auth?.user?.role || (auth as any)?.role;
      const isAdmin = userRole === 'admin' || userEmail === 'admin@seeyc.com';

      console.log('Middleware Check:', { 
        path: nextUrl.pathname, 
        isLoggedIn, 
        role: userRole, 
        email: userEmail,
        isAdmin
      });

      if (isOnAdmin) {
         if (isLoggedIn && isAdmin) return true;
         return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect non-admins to dashboard
      }
      
      if (isOnDashboard) {
        if (isLoggedIn) {
          if (isAdmin) {
            return Response.redirect(new URL('/admin', nextUrl));
          }
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If user is logged in and tries to access auth pages, redirect to dashboard
        if (nextUrl.pathname === '/login' || nextUrl.pathname === '/register') {
             if (isAdmin) {
                return Response.redirect(new URL('/admin', nextUrl));
             }
             return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log('JWT Callback - User:', user);
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session Callback - Token:', token);
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Mock authentication logic
          // In a real app, you would query your database here
          if (email === 'admin@seeyc.com' && password === 'admin123') {
             return {
                id: 'admin-1',
                name: 'Administrador',
                email: 'admin@seeyc.com',
                role: 'admin'
             };
          }
          
          if (email === 'usuario@test.com' && password === 'usuario123') {
             return {
                id: 'usuario-1',
                name: 'Usuario Demo',
                email: 'usuario@test.com',
                role: 'usuario'
             };
          }
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;