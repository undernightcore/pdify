import { object, string } from "zod";

export const urlValidator = object(
  {
    url: string({ required_error: "A URL is required" }).refine(
      (value) => /^(https:|http:)\/\/\S+$/.test(value),
      "It must me a valid URL",
    ),
  },
  { required_error: "You need to indicate a URL to print" },
);
