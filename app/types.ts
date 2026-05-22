export type StatePropsBlogs = {
    errors: Record<string, string>, 
    values: {title: string, author: string, url: string} 
}

export type StatePropsRegistration = {
    errors: Record<string, string>, 
    values: {username: string, name: string, password: string, passwordConfirmation: string} 
}