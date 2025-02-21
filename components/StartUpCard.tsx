import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartUpTypeCard = Omit<Startup, "author"> & { author?: Author }

export const StartUpCard = ({ post }: { post: StartUpTypeCard }) => {

    const {  _createdAt, views, author, title, category, _id, image, description } = post;

    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-5 text-primary" />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1">
                            {author?.name}
                        </p>
                    </Link>

                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link  href={`/user/${author?._id}`}>
                    <Image src = {author?.image ?? "https://placehold.co/48x48"} 
                    alt={author?.name ?? "author name"}
                    width={48}
                    height={48}
                    className="rounded-full" />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}> 
            <p className="startup-card_desc">{description}</p>

            <Image 
            src={image ?? "https://placehold.co/300x200"} 
            alt="placeholder" 
            width={300}
            height={200} 
            className="startup-card_img"/>
            {/* <img src={image} alt="placeholder" className="startup-card_img"/>  */}
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>
                    Ver más
                    </Link>
                </Button>
            </div>
        </li>
    )
}
