function SearchBar({ search, setSearch }) {
  return (
    <div className="max-w-xl mx-auto">

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg bg-white"
      />

    </div>
  );
}

export default SearchBar;