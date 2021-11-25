import { ChildDatabaseBlock, RichTextType } from "./types"

const getPropertyTitle: (
  retrieve: ChildDatabaseBlock["child_database"]["query"][0]["properties"]
) => RichTextType[] = (properties) => {
  return Object.keys(properties)
    .map((key) => {
      const property = properties[key]
      if (property.type === "title") {
        return property.title
      }
    })
    .filter(Boolean)[0] as RichTextType[]
}

export default getPropertyTitle
