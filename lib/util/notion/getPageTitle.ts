import getPropertyTitle from "./getPropertyTitle"
import { GetPageResponse, RichTextType } from "./types"

const getPageTitle: (retrieve: GetPageResponse) => RichTextType[] = (
  retrieve
) => {
  if (
    (retrieve.parent.type === "page_id" ||
      retrieve.parent.type === "database_id") &&
    retrieve.properties.title.type === "title"
  ) {
    return retrieve.properties.title.title
  }
  return getPropertyTitle(retrieve.properties)
}

export default getPageTitle
