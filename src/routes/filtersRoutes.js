const { Router } = require("express")
const filterRouter = require("../controllers/filtersController")

const router = Router()

router.get("/author/:author", filterRouter.filterAuthor)
router.get("/editorial/:editorial", filterRouter.filterEditorial)
router.get("/saga/:saga", filterRouter.filterSaga)

module.exports = router;
