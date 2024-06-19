import {array, boolean, number, object, string} from "zod";

export const optionsValidator = object({
  options: object({
    expandScrolls: boolean().default(false),
    customCss: string().optional(),
    height: number().default(1190),
    width: number().default(1684),
    waitForSelectors: array(string()).optional()
  }).default({}),
});
