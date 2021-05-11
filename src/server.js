import express from "express";

const PORT = 5000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req,res,next) => {
    const url = req.url;
    if(url === "/protected") {
        return res.send("<h1>Not Allowed</h1>");
    }
    next(); 
}

const handleHome = (req, res,next) => {
    res.end();
};

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge");
}

app.use(logger);
app.use(privateMiddleware);
app.get("/",handleHome);
app.get("/protected", handleProtected);

app.listen(5000,() => console.log(`Server listening on port http://localhost:${PORT}`));