import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { useFilter } from "../actions/blogs"

const Blogs = async ({searchParams}: {searchParams: Promise<{filter?: string}>}) => {
  const { filter } = await searchParams
  const allBlogs = await getBlogs()

  const blogs = allBlogs.sort((a, b) => b.likes- a.likes)

  const blogsShow = filter
    ? blogs.filter( f => f.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.likes- a.likes)
    : blogs
  
  return (
    <div>
      <h2>Blogs</h2>
      
      <div>
        <form action={useFilter}>
          <input data-testid="filter-input" className="inputText shadow border-gray-300 focus:ring-blue-500" type="text" id="filter" name="filter" />
          <button data-testid="search-button" className="btn ml-2" type='submit'>Filter</button>
        </form>
      </div>
      <ul data-testid="blogs-list" className="space-y-2">
        {blogsShow.map( b => (
          <li key={b.id} className="border rounded border-blue-100 shadow p-3 hover:bg-blue-50/50">
            <Link href={`/blogs/${b.id}`} className="hyperlink font-bold">{b.title}</Link><br/>
            <div>ID: {b.id}</div>
            <div>Blog Title: {b.title}</div> 
            <div>{b.author}</div>
            <div> {b.url} </div>{b.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs