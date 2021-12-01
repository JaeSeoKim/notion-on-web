import React from "react"
import Link from "next/link"
import { ChildDatabaseBlock } from "../../../lib/util/notion/types"
import Text from "../Text"
import getPropertyTitle from "../../../lib/util/notion/getPropertyTitle"
import NotionIcon from "../NotionIcon"
import Property from "../Common/Property"

export interface ChildDatabaseProps {
  block: ChildDatabaseBlock
}

const ChildDatabase: React.FC<ChildDatabaseProps> = ({ block }) => {
  const { title, query } = block.child_database
  return (
    <div className="notion-table">
      {/* <h5>{title}</h5> */}
      <table>
        {query.map((value) => (
          <tr key={value.id}>
            <td>
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
            </td>

            {/* Other properties */}
            {Object.keys(value.properties).map((key) => {
              const property = value.properties[key]
              if (property.type === "title") return null
              return (
                <td key={property.id}>
                  <Property property={property} />
                </td>
              )
            })}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default ChildDatabase
