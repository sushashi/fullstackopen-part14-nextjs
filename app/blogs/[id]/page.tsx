import { increaseBlogLike } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ( { params }: { params: Promise<{id: string}> } ) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      Author: {blog.author} <br/>
      URL: {blog.url} <br/>

      Likes: {blog.likes}
      <form action={increaseBlogLike}>
        <input type='hidden' name='id' value={blog.id} />
        <button type='submit'>
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage