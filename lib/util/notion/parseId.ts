const pageIdRe = /\b([a-f0-9]{32})\b/
const pageIdUUIDRe =
  /\b([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/

const id2uuid = (id: string) =>
  `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(
    16,
    4
  )}-${id.substr(20)}`

const parseId = (id: string, { uuid }: { uuid?: boolean } = {}) => {
  id = id.split("?")[0]
  let match = id.match(pageIdRe)

  if (match) {
    return uuid ? id2uuid(match[0]) : match[0]
  }

  match = id.match(pageIdUUIDRe)

  if (match) {
    return uuid ? match[0] : match[0].replace(/-/g, "")
  }

  return id
}

export default parseId
