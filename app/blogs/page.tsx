import { getBlogs } from "../services/blogs";
import { useFilter } from "../actions/blogs";
import BlogCard from "./BlogCard";

const Blogs = async ({searchParams}: {searchParams: Promise<{filter?: string}>}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs();

  const blogs = allBlogs.sort((a, b) => b.likes- a.likes);

  const blogsShow = filter
    ? blogs.filter( f => f.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.likes- a.likes)
    : blogs;

  return (
    <div>
      <h2>Blogs</h2>

      <div>
        <form action={useFilter}>
          <input data-testid="filter-input" className="inputText shadow border-gray-300 focus:ring-blue-500" type="text" id="filter" name="filter" />
          <button data-testid="search-button" className="btn ml-2" type='submit'>Search</button>
        </form>
      </div>

      <div data-testid="blogs-list" className="space-y-2">
        {blogsShow.map( b => (
          <div key={b.id}>
            <BlogCard blog={b} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Blogs;