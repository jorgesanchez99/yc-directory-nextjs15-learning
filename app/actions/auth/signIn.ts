"use server"
import { signIn } from "@/auth";


export async function LoginWithGitHUb() {
  await  signIn("github");
}
