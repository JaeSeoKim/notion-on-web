import React from "react"
import { MentionType } from "../../../lib/util/notion/types"
import { SetIntersection } from "utility-types"
import User from "./User"

export interface UsersProps {
  users: SetIntersection<
    MentionType,
    {
      type: "user"
    }
  >["user"][]
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <span className={`notion-users`}>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </span>
  )
}

export default Users
