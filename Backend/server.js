const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectToDatabase = require("./database/db");

app.use(cors());

if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}

connectToDatabase();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});