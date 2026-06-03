import { increaseBlogLike } from "@/app/actions/blogs";
import { addToReadingList, markAsRead } from "@/app/actions/users";
import { getBlogById } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { getReadingListByUser } from "@/app/services/users";
import { notFound } from "next/navigation";

const BlogPage = async ( { params }: { params: Promise<{id: string}> } ) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) notFound();

  const currentUser = await getCurrentUser();
  const readingList = currentUser ? await getReadingListByUser(currentUser.username) : [];
  const blogFromList = readingList.find(item => item.blogId === Number(id));

  return (
    <div data-testid="blog-detail" className="border rounded-md shadow-lg border-blue-200 p-3 hover:bg-blue-50/40">
      <h2 data-testid="blog-title">{blog.title}</h2>

      <div className="border rounded border-blue-200 p-3 bg-white my-1">
        <span className="text-gray-700 text-sm font-bold mb-1">Author:</span> <span data-testid="blog-author">{blog.author}</span> <br/>
        <a href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer" className="hyperlink font-bold">{blog.url} </a><br/>
        <form className="mt-2" action={increaseBlogLike}>
          <input type='hidden' name='id' value={blog.id} />
          <button className="btn text-xs flex items-center gap-2 px-3" type='submit'>
            <span>Likes</span>
            <span className="h-4 w-px bg-gray-400" />
            <span className="font-semibold">{blog.likes}</span>
          </button>
        </form>
      </div>

      {currentUser &&
        <div className="border rounded border-blue-200 p-3 bg-white mt-2">
          <p className="text-sm text-gray-700 font-bold mb-2">Reading Status</p>
          {!blogFromList
            ? <div className="flex justify-between items-center block border rounded border-blue-100 bg-blue-50/50 shadow p-2 my-2 ">
              <div>Not in your reading list yet!</div>
              <div>
                <form action={addToReadingList}>
                  <input type='hidden' name='id' value={blog.id} />
                  <button data-testid="add-to-reading-list-button" className="btn-green text-sm" type='submit'>
                      Add to reading list
                  </button>
                </form>
              </div>
            </div>
            : blogFromList.read
              ? <div className="border text-center rounded border-blue-100 bg-green-50/50 p-1">Already read. Want to revisit it?</div>
              : <div className="flex justify-between items-center border text-center rounded border-blue-100 bg-red-50/50 p-2">
                <div>Still unread in your reading list</div>
                <form action={markAsRead}>
                  <input type='hidden' name='rl_id' value={blogFromList.id} />
                  <button className="btn-green text-sm" type='submit'>Mark as Read</button>
                </form>
              </div>
          }
        </div>
      }
    </div>
  );
};

export default BlogPage;