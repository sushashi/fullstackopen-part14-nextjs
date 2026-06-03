
import Link from "next/link";
import { markAsRead } from "../actions/users";
import { getReadingListByUser } from "../services/users";

type ReadingListWithBlogs = Awaited<ReturnType<typeof getReadingListByUser>>

const ReadingList = ({readingList}: {readingList: ReadingListWithBlogs} ) => {
  const readList = readingList.filter(item => item.read);
  const unreadList = readingList.filter(item => !item.read);

  return (
    <div data-testid="reading-list-section" className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
      <h3>Reading List</h3>
      {readingList.length === 0 && <div data-testid="empty-reading-list" className="text-sm">Empty reading list</div>}

      <div data-testid="unread-section" className="border rounded border-blue-100 shadow bg-red-50/50 hover:bg-red-100/50 p-3 my-2">
        <h4>Unread ( {unreadList.length} )</h4>
        {unreadList.length === 0 && <div data-testid="no-unread-blogs" className="text-xs">No unread blogs</div>}
        {unreadList.map( item => (
          <div key={item.id} className="flex justify-between items-center block border rounded border-blue-100 shadow bg-white p-3 my-2 ">
            <div>
              <Link  href={`/blogs/${item.blogId}`} className="hyperlink">{item.blogs.title}</Link>
            </div>
            <div>
              <form action={markAsRead}>
                <input type='hidden' name='rl_id' value={item.id} />
                <button data-testid="mark-read-" className="btn-green text-xs flex items-center gap-2" type='submit'>
                  <span>Mark as Read</span>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded border-blue-100 shadow bg-green-50/50 hover:bg-green-100/50 p-3 my-2">
        <h4>Read ( {readList.length} )</h4>
        {readList.length === 0 && <div className="text-xs">No read blogs</div>}
        {readList.map( item => (
          <div key={item.id} className="flex justify-between items-center block border rounded border-blue-100 shadow bg-white p-3 my-2 ">
            <Link  href={`/blogs/${item.blogId}`} className="hyperlink">{item.blogs.title}</Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ReadingList;