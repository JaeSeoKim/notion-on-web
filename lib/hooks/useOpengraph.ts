import { OpenGraphType } from "../util/getOpenGraph"
import useRequest, { Config } from "./useRequest"

const useOpengraph = (uri: string, option?: Config<OpenGraphType>) => {
  const { data, error } = useRequest<OpenGraphType>(
    {
      url: `/api/opengraph/${encodeURIComponent(uri)}`,
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      ...option,
    }
  )
  return {
    data,
    error,
  }
}

export default useOpengraph
