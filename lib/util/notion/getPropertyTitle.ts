import { ChildDatabaseBlock, RichTextType } from "./types"

const getPropertyTitle = (
  properties: ChildDatabaseBlock["child_database"]["query"][0]["properties"]
) => {
  const key = Object.keys(properties)
    .map((key) => {
      const property = properties[key]
      if (property.type === "title") {
        return key
      }
    })
    .filter(Boolean)[0] as string

  return {
    key,
    property: (properties[key] as { title: RichTextType[] }).title,
  }
}

export default getPropertyTitle
