import { createBlog } from "@/app/actions/blogs"

const NewBlog = () => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
        <table>
          <tbody>
            <tr>
              <td><label>Title</label></td>
              <td>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Author</label></td>
              <td>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>URL</label></td>
              <td>
                <input
                  type="text"
                  id="url"
                  name="url"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog