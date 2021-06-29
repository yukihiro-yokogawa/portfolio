"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://lodalhost:8080" : "http://portfolio_be:8080";
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express_1.default();
    server.use(express_1.default.json());
    server.get("/api/profile/get", (_req, res) => {
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
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
        axios_1.default
            .post(`${url}/api/skill/post`, req.body.params.data)
            .then((response) => {
            res.send(response.data);
        })
            .catch((err) => {
            console.log(err);
            res.status(err.statusCode).send(err);
        });
    });
    server.get("/profile", (_req, res) => res.sendFile(path_1.default.join(path_1.default.resolve("./src/pages/Profile/", "profile.tsx"))));
    server.get("/profile/edit", (_req, res) => res.sendFile(path_1.default.join(path_1.default.resolve("./src/pages/Profile/", "create.tsx"))));
    server.get("/skill", (_req, res) => res.sendFile(path_1.default.join(path_1.default.resolve("./src/pages/Skill/", "skill.tsx"))));
    server.get("/skill/edit", (_req, res) => res.sendFile(path_1.default.join(path_1.default.resolve("./src/pages/Skill/", "create.tsx"))));
    server.get("/work/new", (_req, res) => res.sendFile(path_1.default.join(path_1.default.resolve("./src/pages/Work/", "work.tsx"))));
    server.get("/work/edit", (_req, res) => res.sendFile(path_1.default.join(path_1.default.resolve("./src/pages/Work/", "create.tsx"))));
    server.all("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=server.js.map