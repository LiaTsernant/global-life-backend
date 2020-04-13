const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const routes = require("./routes");
const cors = require("cors");

const corsOptions = {
    origin: ["exp://192.168.8.189:19000"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -----------------------------------------------------------------
// Custom console logger
app.use((req, res, next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleTimeString();
    const result = `${method} ${url} ${requestedAt}`;
    console.log(result);
  
    next();
});

// ROUTES-----------------------------------------------------------------
app.use("/api/v1", routes.api);

// // Wrong api route
app.use("/api/*", (req, res) => {
    res.status(404).json({ status: 404, error: "Source not found." })
});

// -----------------------------------------------------------------
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));