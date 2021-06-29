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

  server.get("/api/profile/get", (_req, res) => {
    axios
      .get(`${url}/api/profile/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/my_profile/get", (_req, res) => {
    axios
      .get(`${url}/api/my_profile/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.post("/api/my_profile/post", (req, res) => {
    axios
      .post(`${url}/api/my_profile/post`, req.body.params.data)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/project/get", (_req, res) => {
    axios
      .get(`${url}/api/project/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/project/getOne", (req, res) => {
    axios
      .get(`${url}/api/project/getOne`, {
        params: { id: req.query.id },
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.post("/api/project/post", (req, res) => {
    axios
      .post(`${url}/api/project/post`, req.body.params.data)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/technique/get", (_req, res) => {
    axios
      .get(`${url}/api/technique/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.post("/api/technique/post", (req, res) => {
    axios
      .post(`${url}/api/technique/post`, req.body.params.data)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/about/get", (_req, res) => {
    axios
      .get(`${url}/api/about/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.post("/api/about/post", (req, res) => {
    axios
      .post(`${url}/api/about/post`, req.body.params.data)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/techniqueType/get", (_req, res) => {
    axios
      .get(`${url}/api/techniqueType/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/skill/get", (_req, res) => {
    axios
      .get(`${url}/api/skill/get`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.get("/api/skill/getDeleted", (_req, res) => {
    axios
      .get(`${url}/api/skill/getDeleted`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.statusCode).send(err);
      });
  });

  server.post("/api/skill/post", (req, res) => {
    axios
      .post(`${url}/api/skill/post`, req.body.params.data)
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
