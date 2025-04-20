import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface SearchFiltersProps {
  data: any;
}

export const SearchFilters = ({ data }: SearchFiltersProps) => {
  return (
    <div className="flex flex-col px-4 lg:px-12 py-8 border-b gap-4 w-full">
      <SearchInput disabled={false} />
      <Categories data={data} />
    </div>
  );
};
