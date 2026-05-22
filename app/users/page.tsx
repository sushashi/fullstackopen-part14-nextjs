import { getUsers } from "../services/users"
import Link from "next/link"

const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
        {users.map((user) => (
            <Link 
              key={user.id}
              className="hyperlink list-disc font-bold block border rounded border-blue-100 shadow bg-white hover:bg-blue-50/50 p-3 my-2"
              href={`/users/${user.username}`}>
                {user.username}
            </Link>
        ))}
    </div>
  )
}

export default Users