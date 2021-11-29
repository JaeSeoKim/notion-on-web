import React from "react"
import Link from "next/link"
import { ChildDatabaseBlock } from "../../../lib/util/notion/types"
import Text from "../Text"
import getPropertyTitle from "../../../lib/util/notion/getPropertyTitle"
import NotionIcon from "../NotionIcon"
import Property from "../Coommon/Property"

export interface ChildDatabaseProps {
  block: ChildDatabaseBlock
}

const ChildDatabase: React.FC<ChildDatabaseProps> = ({ block }) => {
  const { title, query } = block.child_database
  return (
    <div>
      <h5>{title}</h5>
      {query.map((value) => (
        <div className="notion-table" key={value.id}>
          {/* Title */}
          <Link href={`/${value.id}`}>
            <a>
              <NotionIcon
                icon={value.icon}
                block_id={value.id}
                placeHolderType="empty"
              />
              <Text
                rich_texts={getPropertyTitle(value.properties)}
                block_id={block.id}
              />
            </a>
          </Link>

          {/* Other properties */}
          {Object.keys(value.properties).map((key) => {
            return (
              <Property
                key={value.properties[key].id}
                property={value.properties[key]}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ChildDatabase
