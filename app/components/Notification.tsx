"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (

    <div className="sticky top-14 w-full flex justify-center mb-5">
      <div 
        data-testid={type==="success" ? "notification" : "error-message"}
        className={`border-1 max-w-xl w-full p-3 rounded font-bold
        ${type==='success'? "bg-green-200/80 border-green-800 text-green-900" : "bg-red-100/80 border-red-800 text-red-600"}`}>
          {message}
      </div>
    </div>
  )
}