
import prisma from "@/app/lib/prisma";
import NextAuth, { Account, AuthOptions, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { buscarUsuario } from "@/app/lib/buscarLogin";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            authorize: async (credentials, req) => {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;
                const user = await buscarUsuario(email, password);

                if(user){
                    return { id: user[0], email: user[1], password: user[2]
                }}
                return null;
               
            }
        })
    ],
    pages: {
        signIn: '../(auth)/login',
        signOut: '../(auth)/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({ secret, token }) {
            if (!token) {
                throw new Error('Sem token para codificar');
            }
            return jwt.sign(token, secret);
        },
        async decode({ secret, token }) {
            if (!token) {
                throw new Error('Sem token para decodificar');
            }
            const decodeToken = jwt.verify(token, secret);
            if (typeof decodeToken === 'string') {
                return JSON.parse(decodeToken);
            } else {
                return decodeToken;
            }
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 3600,
        updateAge: 1800,    
    },
    callbacks: {
        async session(params: { session: Session; token: JWT; user: User}){
            if(params.session.user){
                params.session.user.email = params.token.email;
            }
            return params.session;
        },
        async jwt(params:{
            token: JWT;
            user?: User | undefined;
            account?: Account | null | undefined;
            profile?: Profile | undefined;
            isNewUser?: boolean | undefined;
        }) {
            if(params.user){
                params.token.email = params.user.email;
            }
            return params.token;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};