import {
  GetFileErrorType,
  GetFileSuccessType,
} from "../../pages/api/file/[block_id]"
import useRequest, { Config } from "./useRequest"

const useFileSrc = (
  block_id: string,
  option?: Config<GetFileSuccessType, GetFileErrorType>
) => {
  const { data, error } = useRequest<GetFileSuccessType, GetFileErrorType>(
    {
      url: `/api/file/${block_id}`,
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      // dedupingInterval: 1Hour
      dedupingInterval: 60 * 60 * 60,
      ...option,
    }
  )
  return {
    data,
    error,
  }
}

export default useFileSrc
