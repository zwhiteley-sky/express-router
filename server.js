const app = require('./src/app')
const seed = require("./seed");
const port = 3000


seed().then(() => { app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})});
