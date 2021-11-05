import type { NextApiRequest, NextApiResponse } from "next"
import getOpenGraph from "lib/util/getOpenGraph"

const MAX_AGE = 5 /* 5day */ * 24 /* 24hour */ * 60 /* 60min */ * 60 /* 60sec */

const getController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { encodeURI } = req.query as {
    encodeURI: string
  }

  try {
    const results = await getOpenGraph({
      url: encodeURI,
    })
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${MAX_AGE}, max-age=${MAX_AGE}, stale-while-revalidate=${MAX_AGE}`
    )
    res.status(200).json(results)
  } catch (error) {
    console.log("OpenGraph fetch fail :", encodeURI)

    res.status(504).json({ error: "internal server error" })
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
