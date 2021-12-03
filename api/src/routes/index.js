const { Router } = require("express");
const petitions = require("./petitions/petitions");
const summoner = require("./summoner/summoner");

const router = Router();

router.use("/petitions", petitions);
router.use("/summoner", summoner);

router.get("/", (req, res, next) => {
    return res.send("Get de TXT v2.0")
})

module.exports = router;