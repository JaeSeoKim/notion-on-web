import React from "react"
import { PropertyType } from "../../../lib/util/notion/types"
import CheckBoxIcon from "../../icon/CheckBoxIcon"
import Text from "../Text"
import DateTime from "./DateTime"
import Email from "./Email"
import Formula from "./Formula"
import MultiSelect from "./MultiSelect"
import Number from "./Number"
import Select from "./Select"
import User from "./User"
import Users from "./Users"

export interface PropertyProps {
  property: PropertyType
}

const Property: React.FC<PropertyProps> = ({ property }) => {
  if (property.type === "rich_text") {
    return <Text rich_texts={property.rich_text} block_id={property.id} />
  }
  if (property.type === "people") {
    return <Users users={property.people} />
  }
  if (property.type === "select") {
    return <Select select={property.select} />
  }
  if (property.type === "multi_select") {
    return <MultiSelect multi_select={property.multi_select} />
  }
  if (property.type === "checkbox") {
    return <CheckBoxIcon checked={property.checkbox} />
  }
  if (property.type === "created_by") {
    return <User user={property.created_by} />
  }
  if (property.type === "last_edited_by") {
    return <User user={property.last_edited_by} />
  }
  if (property.type === "created_time") {
    return (
      <DateTime
        date={{
          start: property.created_time,
          end: null,
        }}
      />
    )
  }
  if (property.type === "last_edited_time") {
    return (
      <DateTime
        date={{
          start: property.last_edited_time,
          end: null,
        }}
      />
    )
  }
  if (property.type === "formula") {
    return <Formula formula={property.formula} />
  }
  if (property.type === "email") {
    return <Email email={property.email} />
  }
  if (property.type === "number") {
    return <Number number={property.number} />
  }
  if (property.type === "files") {
    return (
      <>
        {property.files.map((file) => {
          file.name
        })}
      </>
    )
  }
  return null
}

export default Property
