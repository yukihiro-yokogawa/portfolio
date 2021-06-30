import express from "express";
import next from "next";
import axios from "axios";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:8080" : "http://portfolioapi:8080";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get("/api/:page/:method", (req, res) => {
    const getUrl = `${url}/api/${req.params.page}/${req.params.method}`;
    axios
      .get(
        getUrl,
        req.query.id !== null
          ? {
              params: { id: req.query.id },
            }
          : null
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.post("/api/:page/:method", (req, res) => {
    const postUrl = `${url}/api/${req.params.page}/${req.params.method}`;
    axios
      .post(postUrl, req.body.params.data)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
