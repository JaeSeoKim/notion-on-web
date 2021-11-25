import React from "react"
import Link from "next/link"
import { ChildDatabaseBlock } from "../../../lib/util/notion/types"
import Text from "../Text"
import getPropertyTitle from "../../../lib/util/notion/getPropertyTitle"
import NotionIcon from "../NotionIcon"

export interface ChildDatabaseProps {
  block: ChildDatabaseBlock
}

const ChildDatabase: React.FC<ChildDatabaseProps> = ({ block }) => {
  const { title, query } = block.child_database
  return (
    <div>
      <h5>{title}</h5>
      {query.map((value) => (
        <div key={value.id}>
          {/* Title */}
          <Link href={`/${value.id}`}>
            <a>
              <NotionIcon icon={value.icon} block_id={value.id} />
              <Text
                rich_texts={getPropertyTitle(value.properties)}
                block_id={block.id}
              />
            </a>
          </Link>

          {/* Other properties */}
          {Object.keys(value.properties).map((key) => {
            const property = value.properties[key]
            switch (property.type) {
              case "rich_text":
                return (
                  <Text rich_texts={property.rich_text} block_id={block.id} />
                )
              case "select":
                return <span>{property.select?.name}</span>
              default:
                break
            }
          })}
        </div>
      ))}
    </div>
  )
}

export default ChildDatabase
