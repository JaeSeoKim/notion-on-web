import React from "react"
import { MentionType } from "../../../lib/util/notion/types"
import { SetIntersection } from "utility-types"

export interface UserProps {
  user: SetIntersection<
    MentionType,
    {
      type: "user"
    }
  >["user"]
}

const User: React.FC<UserProps> = ({ user }) => {
  const UserContent = () => {
    if ("type" in user) {
      switch (user.type) {
        case "person":
          return <>{user.name || user.person.email}</>
        case "bot":
          return <>{user.name || user.id}</>
      }
    }
    return <>{user.id}</>
  }
  return (
    <span className={`notion-user`} data-user-id={user.id}>
      @<UserContent />
    </span>
  )
}

export default User
