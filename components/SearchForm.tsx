import Form from "next/form";
import { SearchFormReset } from "./SearchFormReset";
import { Search } from "lucide-react";

interface Props{
  query?: string;
}

export const SearchForm = ({query}:Props) => {
  
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
      name="query"
      defaultValue={query}
      className="search-input"
      placeholder="Buscar por titulo, categoría o autor"
      />

      <div className="flex gap-2">
        {query &&  <SearchFormReset />}

        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}
