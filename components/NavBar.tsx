import { LoginWithGitHUb, Logout } from "@/app/actions";
import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CiLogout } from "react-icons/ci";
import { LuBadgePlus } from "react-icons/lu";

export const NavBar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/" >
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={144}
                        height={30}
                    />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Crear</span>
                                <LuBadgePlus className="ml-3 size-6 sm:hidden text-green-500"/>
                            </Link>
                            <form action={Logout}>
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                    <CiLogout className="size-6 sm:hidden text-red-500"/>
                                </button>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10" >
                                    <AvatarImage src={session?.user?.image || ""}  alt={session?.user?.name || ""} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar> 
                            </Link>
                        </>
                    ) : (
                        <form action={LoginWithGitHUb}>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}
