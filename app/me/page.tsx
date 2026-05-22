import { redirect } from "next/navigation"
import { generateToken, markAsRead } from "../actions/users"
import { getCurrentUser } from "../services/session"
import { getReadingListByUser } from "../services/users"
import Link from "next/link"

const Me = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/login")
  
  const readingList = await getReadingListByUser(currentUser.username)
  const readList = readingList.filter(item => item.read)
  const unreadList = readingList.filter(item => !item.read)

  const generateTokenUsername = generateToken.bind(null, currentUser.username)
  return (
    <div>
      <h2>Me Page</h2>
      <div data-testid="user-profile" className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
        <h3>My Profile</h3>
        <p data-testid="user-name" className="m-2"><span className="text-gray-700 text-sm font-bold mb-1">Name: </span>{currentUser.name}</p>
        <p data-testid="user-username" className="m-2"><span className="text-gray-700 text-sm font-bold mb-1">Username: </span> {currentUser.username}</p>
      </div>

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

      <div data-testid="api-token-section" className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
        <h3>API Token</h3>
          <form action={generateTokenUsername}>
            <div className="border bg-white rounded border-blue-100 p-2 m-2">
            <label>Current Token</label>
            <p data-testid="api-token" className="rounded text-center p-1 m-3 bg-blue-100">
              {currentUser.token ? <span data-testid="token-display">{currentUser.token}</span> : <span data-testid="no-token-message">No Token</span>}
            </p>
            </div>
            <button data-testid="generate-token-button" className="btn" type="submit">Generate New Token</button>
          </form>
      </div>
    </div>
  )
}

export default Me