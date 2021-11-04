import type { NextApiRequest, NextApiResponse } from "next"
import { isNotionClientError } from "@notionhq/client/build/src"
import getFileSrc from "../../../lib/util/notion/getFileSrc"

import url from "url"
import http from "http"
import https from "https"

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
    const file = await getFileSrc(block_id)

    if (file) {
      const { url: imageURL, expiry_time } = file

      const MAX_AGE = expiry_time
        ? parseInt(((Date.parse(expiry_time) - Date.now()) / 1000).toFixed())
        : 60 /* 60min */ * 60 /* 60sec */

      res.setHeader(
        "Cache-Control",
        `public, s-maxage=${MAX_AGE}, max-age=${MAX_AGE}, stale-while-revalidate=${MAX_AGE}`
      )
      const parts = new URL(imageURL)

      const filename = parts.pathname.split("/").pop()

      const options = {
        port: parts.protocol === "https:" ? 443 : 80,
        host: parts.hostname,
        method: "GET",
        path: parts.href,
        accept: "*/*",
      }

      var request =
        options.port === 443 ? https.request(options) : http.request(options)

      request.addListener("response", (proxyResponse) => {
        var offset = 0
        var contentLength = parseInt(
          proxyResponse.headers["content-length"] as string,
          10
        )
        var body = Buffer.alloc(contentLength)

        proxyResponse.setEncoding("binary")
        proxyResponse.addListener("data", function (chunk) {
          body.write(chunk, offset, "binary")
          offset += chunk.length
        })

        proxyResponse.addListener("end", function () {
          res.setHeader(
            "content-type",
            proxyResponse.headers["content-type"] as string
          )
          res.write(body)
          res.end()
        })
      })

      request.end()
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getController(req, res)
  }

  res.status(405).json({
    error: "method not allowed",
  })
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
