import express, { json } from "express";
import router from "./routes";
import routeNotFound from "./handlers/route";

import { zodErrorHandler } from "./handlers/zod";
import { defaultErrorHandler } from "./handlers/default";

const app = express();

app.use(json());
app.use(router);

app.all("*", (_, res) => {
  return res.status(404).json({ message: "Route not found" });
});

app.use(routeNotFound);
app.use(zodErrorHandler);
app.use(defaultErrorHandler);

app.listen(8080, () => console.log("Pdify started!"));
