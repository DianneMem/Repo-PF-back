const server = require("./src/app")
const config = require("./src/configuration/config.js")



server.listen(config.PORT,() =>{
    console.log(`listening on port ${config.PORT}`);
});

