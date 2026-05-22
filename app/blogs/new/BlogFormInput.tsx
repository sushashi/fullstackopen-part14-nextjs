type StatePropsBlogs = {
    errors: Record<string, string>, 
    values: {title: string, author: string, url: string} 
}

type FormInputProps = {
  state: StatePropsBlogs,
  type: string,
  id: string,
  name: keyof StatePropsBlogs["values"],
  label: string
}

const FormInput = ( {state, type, id, name , label}: FormInputProps ) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-1">{label}</label>
      <input
        className={`w-full inputText ${state.errors[name] ? "border-red-500 focus:ring-red-600" : "border border-gray-300 focus:ring-blue-500"}`}
        type={type}
        id={id}
        name={name}
        defaultValue={state.values?.[name]}
        required
      />
      <p className="text-red-500 text-xs italic">{state.errors[name] || "" }</p>
  </div>
  )
}

export default FormInput