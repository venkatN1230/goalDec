// @ts-nocheck
import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        
        // Bonus 5.1: Automatic org hierarchy sync & Role mapping via Azure AD
        // Assume profile.groups contains Azure AD Object IDs
        const groups = (profile as any).groups || [];
        token.role = groups.includes('admin-group-id') ? 'ADMIN' : 
                     groups.includes('manager-group-id') ? 'MANAGER' : 'EMPLOYEE';
        
        // Assume profile.manager contains the manager's Entra ID
        token.managerId = (profile as any).manager || null;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the mapped Azure AD attributes to the client session
      if (session.user) {
        (session.user as any).role = token.role || "EMPLOYEE";
        (session.user as any).managerId = token.managerId;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }
