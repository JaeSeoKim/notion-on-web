import {
  GetFileErrorType,
  GetFileSuccessType,
} from "../../pages/api/file/[block_id]"
import useRequest from "./useRequest"

const useFileSrc = (block_id: string) => {
  const { data, error } = useRequest<GetFileSuccessType, GetFileErrorType>(
    {
      url: `/api/file/${block_id}`,
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      // focusThrottleInterval: 1Hour
      focusThrottleInterval: 60 * 60 * 60 * 1000,
    }
  )
  return {
    data,
    error,
  }
}

export default useFileSrc
