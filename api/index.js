const server = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})