import { client } from "@/sanity/lib/client";
import { startups_by_author_query } from "@/sanity/lib/queries";
import { StartUpCard, StartUpTypeCard } from "./StartUpCard";

interface Props {
    id: string;
}

export const UserStartups = async ({id}:Props) => {

    const startups = await client.fetch(startups_by_author_query, {id});

  return (
    <>
        {startups.length > 0 ? startups.map((startup:StartUpTypeCard) => (
            <StartUpCard key={startup._id} post={startup} />
        )) : <p className="no-result">No startups yet</p>}
    </>
  )
}
