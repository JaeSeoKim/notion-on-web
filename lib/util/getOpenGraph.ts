import metascraper from "metascraper"
import metascraperUrl from "metascraper-url"
import metascraperTitle from "metascraper-title"
import metascraperPublisher from "metascraper-publisher"
import metascraperDescription from "metascraper-description"
import metascraperImage from "metascraper-image"
import metascraperLogo from "metascraper-logo"
import metascraperLogoFavicon from "metascraper-logo-favicon"
import puppeteer from "puppeteer-core"
import chrome from "chrome-aws-lambda"
import { PromiseType } from "utility-types"
import { isDev } from "./config"

const metaScraper = metascraper([
  metascraperUrl(),
  metascraperTitle(),
  metascraperPublisher(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperLogoFavicon(),
])

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

interface Options {
  args: string[]
  executablePath: string
  headless: boolean
}

export async function getPuppeterOption(isDev: boolean) {
  let options: Options
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    }
  }
  return options
}

export interface getOpenGraphProps {
  url: string
}

const getOpenGraph = async ({ url }: getOpenGraphProps) => {
  const puppeteerOption = await getPuppeterOption(isDev)
  const browser = await puppeteer.launch(puppeteerOption)
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: "load",
  })

  const html = await page.content()

  await browser.close()

  const results = await metaScraper({
    url: url,
    html: html,
  })
  return results
}

export type OpenGraphType = PromiseType<ReturnType<typeof getOpenGraph>>

export default getOpenGraph
