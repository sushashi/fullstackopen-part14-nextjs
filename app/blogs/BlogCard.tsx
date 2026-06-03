import Link from "next/link";
import { blogs } from "@/db/schema";

type Blog = typeof blogs.$inferSelect

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Link href={`/blogs/${blog.id}`} >
        <div className="border rounded border-blue-100 shadow p-3 hover:bg-blue-50/50">
          <span className="text-blue-600 text-l font-bold">{blog.title}</span>
            &nbsp; | &nbsp;
          <span className="text-gray-700 text-sm font-bold">{blog.likes} likes</span>
          <div className="text-gray-700 text-sm ">by {blog.author}</div>
        </div>
      </Link>
    </div>
  );
};
export default BlogCard;