import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { promises as fs } from 'fs';


const app = new Hono();

app.use("/*", cors());


const projects = []; // Intern liste med prosjekter

//henter statiske filer og html
app.use("/static/*", serveStatic({ root: "./" }));
app.get('/', serveStatic({ path: 'index.html' }));

//server respons som returnerer dataene fra json filen
app.get("/json", async (c) => {
  const data = await fs.readFile('./static/data.json', 'utf8')
  const dataAsJson = JSON.parse(data)
  return c.json(dataAsJson);
});

//server respons som ved trykk på submit legger inn prosjektet fra skjemaet i den tomme listen
app.post('/add', async (c) => {
  const newproject = await c.req.json();
  projects.push(newproject);
  console.log(projects);
  return c.json({ message: 'Project received' }, 201);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
