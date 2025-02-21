import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { author_by_github_id_query } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

// @ts-expect-error - auth is not defined in the types
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      // @ts-expect-error - profile is not defined in the types
      user: { name, email, image },
      // @ts-expect-error - profile is not defined in the types
      profile: { id, login, bio }
    }) {
      const existingUser = await client.withConfig({useCdn:false}).fetch(author_by_github_id_query, {
        id
      });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        })
      }

      return true;
    },

    // @ts-expect-error - token is not defined in the types
    async jwt ({token,account,profile}){
      if (account && profile) {
        const user = await client.withConfig({useCdn:false}).fetch(author_by_github_id_query, {id: profile?.id});
        token.id = user?._id;
      }
      return token;
    },

    // @ts-expect-error - session is not defined in the types
    async session({session, token}){
      Object.assign(session, {id: token.id});
      return session;
    }
  }
})