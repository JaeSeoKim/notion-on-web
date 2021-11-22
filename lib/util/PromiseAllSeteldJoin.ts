import { isNotionClientError } from "@notionhq/client/build/src"

const PromiseAllSeteldJoin = async <T>(promises: Promise<T>[]) => {
  let result: any[] = []
  const response = await Promise.allSettled(promises)
  response.forEach((_result) => {
    if (_result.status === "fulfilled") {
      result.push(_result.value)
    } else {
      if (isNotionClientError(_result.reason)) {
        console.log(_result.reason.message)
      } else {
        console.log(_result.reason)
      }
    }
  })
  return result
}

export default PromiseAllSeteldJoin
