import type { NextApiRequest, NextApiResponse } from "next"
import { isNotionClientError } from "@notionhq/client/build/src"
import getFileSrc from "../../../lib/util/notion/getFileSrc"

export type GetFileSuccessType = {
  src: string
}
export type GetFileErrorType = {
  error: string
  message?: string
}

const getController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { block_id } = req.query as {
    block_id: string
  }
  try {
    const fileSrc = await getFileSrc(block_id)

    if (fileSrc) {
      res.status(200).json({
        src: fileSrc,
      })
    } else {
      res.status(400).json({
        error: "bad request",
        message: `wrong request block type : ${block_id}`,
      })
    }
  } catch (error) {
    if (isNotionClientError(error)) {
      res
        .status(504)
        .json({ error: "internal server error", message: error.message })
    } else {
      res.status(504).json({ error: "internal server error" })
    }
  }
}

const constroller = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getController(req, res)
  }

  res.status(405).json({
    error: "method not allowed",
  })
}

export default constroller
