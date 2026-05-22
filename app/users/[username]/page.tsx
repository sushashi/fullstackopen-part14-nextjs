import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{username: string}> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <div className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
        <h3>User details</h3>
        <p><span className="text-gray-700 text-sm font-bold mb-1">Username:</span> {user.username}</p>
        <p><span className="text-gray-700 text-sm font-bold mb-1">Name:</span> {user.name}</p>
      </div>

      <div className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
        <h3>Blogs posted</h3>
          {user.blogs.map( blog => (
            <Link 
              key={blog.id}
              className="hyperlink flex justify-between items-center block border rounded border-blue-100 shadow bg-white p-3 my-2"
              href={`/blogs/${blog.id}`}>
                {blog.title}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default UserPage