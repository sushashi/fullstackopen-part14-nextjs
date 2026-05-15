const blogs = [
    {
        id: 1,
        title: 'Super Blog',
        author: 'Dorothe',
        url: 'www.dorothe.com',
        likes: 12
    },
    {
        id: 2,
        title: 'Blog of Pikachu',
        author: 'George Breggi',
        url: 'www.pikachu.com',
        likes: 10
    },
    {
        id: 3,
        title: 'Mastermind Blog',
        author: 'Michael Jackson',
        url: 'www.mastermind.com',
        likes: 8
    },
]

let nextId = 4

export const getBlogs = () => {
    return blogs
}

export const getBlogById = (id: number) => {
    return blogs.find( b => b.id === id)
}

export const addBlog = (title:string, author:string, url:string) => {
    blogs.push({
        id: nextId++,
        title,
        author,
        url,
        likes: 0
    })
}

export const increaseLike = (id: number) => {
    const blog = blogs.find( b => b.id === id)
    if (blog) {
        blog.likes = blog.likes + 1
    }
}