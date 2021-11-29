import React from "react"

export interface EmailProps {
  email: string | null
}

const Email: React.FC<EmailProps> = ({ email }) => {
  if (!email) return null
  return <a href={`mailto:${email}`}>{email}</a>
}

export default Email
