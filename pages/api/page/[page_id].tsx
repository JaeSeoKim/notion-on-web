import type { NextApiRequest, NextApiResponse } from "next"
import getPage from "lib/util/notion/getPage"

const getController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page_id } = req.query as {
    page_id: string
  }
  try {
    const results = await getPage(page_id)
    res.status(200).json(results)
  } catch (error) {
    res.status(504).json({ error: "internal server error" })
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getController(req, res)
  }

  res.status(405).json({
    error: "method not allowed",
  })
}
