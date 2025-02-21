// import { auth } from "@/auth";
import { SearchForm } from "@/components/SearchForm";
import { StartUpCard, StartUpTypeCard } from "@/components/StartUpCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { startups_query } from "@/sanity/lib/queries";

export default async function Home({searchParams}: {searchParams: Promise<{query? : string}>}) {
  
  const {query} = await searchParams;
  const params = {search: query || null};

  // const session = await auth();

  // const posts = await client.fetch(startups_query);
  const {data: posts} = await sanityFetch({ query: startups_query, params });
  // console.log(JSON.stringify(posts, null, 2));

  
  return (
    <>
      <section className="pink_container">
        
        <h1 className="heading">Presenta tu startup, <br /> Conecta con emprendedores</h1>

        <p className="sub-heading !max-w-3xl">
          Envía ideas, vota por propuestas y destaca en competencias virtuales.
        </p>

        <SearchForm query={query} />

      </section>

      <section className="section_container">
        <p className="text-30-semibold">
            { query ? `Resultados para: "${query}"` : "Últimas startups"
            }
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length >0 ? (
            posts.map((post:StartUpTypeCard ) => (
              <StartUpCard key={post?._id}  post={post}/>
            )
          )): (
            <p className="no-results"> No se encontraron StartUps</p>
          )
          }
        </ul>
      </section>
          <SanityLive />
    </>
  );
}
