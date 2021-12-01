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

  const { key: titleKey } = getPropertyTitle(query[0].properties)
  return (
    <div className="notion-table">
      <h5>{title}</h5>
      <table>
        <tr>
          <th>{titleKey}</th>
          {Object.keys(query[0].properties).map((key) => {
            if (query[0].properties[key].type === "title") return null
            return <th key={key}>{key}</th>
          })}
        </tr>
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
                  <span>
                    {getPropertyTitle(value.properties)
                      .property.map((v) => v.plain_text)
                      .join("")}
                  </span>
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
