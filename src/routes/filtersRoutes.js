const { Router } = require("express")
const filterRouter = require("../controllers/filtersController")

const router = Router()

router.get("/:author", filterRouter.filterAuthor)

module.exports = router;
