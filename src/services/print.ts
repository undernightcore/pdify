import puppeteer, { Browser } from "puppeteer";
import { getDateWithMillis } from "../helpers/date";

let browser: Browser | undefined;

export const printUrl = async (
  url: string,
  options: {
    expandScrolls: boolean;
    customCss?: string;
    width: number;
    height: number;
    waitForSelectors?: string[];
  },
) => {
  if (!browser) {
    console.log("Opening Chrome for the first time!", url, getDateWithMillis());
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "shell",
    });
    console.log("Chrome opened!", url, getDateWithMillis());
  }

  const requests = new Map<string, Date>();

  console.log("Open page!", url, getDateWithMillis());
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  page.on("request", (request) => {
    if (request.method() === "OPTIONS") return;
    requests.set(request.url(), new Date());
  });

  page.on("response", (response) => {
    if (response.request().method() === "OPTIONS") return;
    const request = requests.get(response.url());
    if (!request) return;
    console.log(
      "Finished request!",
      response.url(),
      `started at ${getDateWithMillis(request)} finished in`,
      `${new Date().getTime() - request.getTime()}ms`,
    );
  });

  await page.setViewport({ height: options.height, width: options.width });

  try {
    console.log("Opening url!", url, getDateWithMillis());
    await page.goto(url);
  } catch (e) {
    await context.close();
    throw e;
  }

  if (options.expandScrolls)
    await page.addStyleTag({ content: "* {overflow: unset !important;}" });
  if (options.customCss) await page.addStyleTag({ content: options.customCss });

  if (options.waitForSelectors) {
    await Promise.all(
      options.waitForSelectors.map((selector) =>
        page.waitForSelector(selector),
      ),
    );
  } else {
    await page.waitForNetworkIdle();
  }

  console.log("Creating PDF!", url, getDateWithMillis());
  const data = await page.pdf({
    height: options.height,
    width: options.width,
    printBackground: true,
  });
  await context.close();

  console.log("PDF created!", url, getDateWithMillis());

  return data;
};
