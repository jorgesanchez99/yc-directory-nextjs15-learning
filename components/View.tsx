import { startup_views_by_id_query } from "@/sanity/lib/queries";
import { Ping } from "./Ping"
import { client } from "@/sanity/lib/client";
import { formatView } from '../lib/utils';
import { writeClient } from '../sanity/lib/write-client';
import { after } from 'next/server'

interface Props{
    id: string
}

export const View = async ({id}:Props) => {

    const {views:totalViews} = await client.withConfig({useCdn: false}).fetch(startup_views_by_id_query, {id});
    
    after(async () => {
        await writeClient.patch(id).set({views: totalViews + 1}).commit();
    })

  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping />
        </div>
        <p className="view-text">
            <span className="font-black">{formatView(totalViews)}</span>
        </p>
    </div>
  )
}
