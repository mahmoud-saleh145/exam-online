import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
export const options: NextAuthOptions = {
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {


            return { ...session, ...token, ...user }
        }
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            async authorize(credentials, req) {
                const res = await fetch('https://exam.elevateegy.com/api/v1/auth/signin', {
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }
                    ),
                    headers: { "Content-Type": "application/json" },
                    method: 'POST'
                })
                const result = await res.json()

                // console.log("res", result);



                if (result?.user?.email === credentials?.email) {
                    return result
                }
                return null
            },
            credentials: {
                email: {
                },
                password: {
                }
            }
        })

    ]
}


const handler = NextAuth(options)
export { handler as GET, handler as POST }