import { RequestHandler } from "express";
import { optionsValidator } from "../validators/options";
import { printUrl } from "../services/print";
import { urlValidator } from "../validators/url";
import {getDateWithMillis} from "../helpers/date";

export const printWebsite: RequestHandler = async (req, res) => {
  console.log("Request received!", req.url, getDateWithMillis());

  const { url } = urlValidator.parse(req.body);
  const { options } = optionsValidator.parse(req.body);

  const pdf = await printUrl(url, options);
  return res.status(200).setHeader("content-type", "application/pdf").send(pdf);
};
