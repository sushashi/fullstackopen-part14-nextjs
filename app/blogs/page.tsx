import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { useFilter } from "../actions/blogs"

const Blogs = async ({searchParams}: {searchParams: Promise<{filter?: string}>}) => {
  const { filter } = await searchParams
  const blogs = getBlogs().sort((a, b) => b.likes- a.likes)

  const blogsShow = filter
    ? blogs.filter( f => f.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.likes- a.likes)
    : blogs
  
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <form action={useFilter}>
          <input type="text" id="filter" name="filter" />
          <button type='submit'>Filter</button>
        </form>
      </div>
      <ul>
        {blogsShow.map( b => (
          <li key={b.id}>
            <Link href={`/blogs/${b.id}`}>{b.title}</Link> 
            {b.id} {b.title} {b.author} {b.url} {b.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs