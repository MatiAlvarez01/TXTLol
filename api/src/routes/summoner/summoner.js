const { Router } = require("express");
const Summoner = require("../../models/summoner");
const bcrypt = require("bcryptjs")
const passport = require("passport")

const router = Router();

router.get("/", (req, res, next) => {
    console.log("session:" , req?.session?.passport?.user)
    console.log("req user: ", req.user)
    return res.status(200).send("Get de summoner")
})

router.get("/all", async (req, res, next) => {
    const allSummoners = await Summoner.find()
    const allNames = allSummoners.map(summoner => summoner.name)
    return res.status(200).send(allNames)
})

router.get("/userLogged", async (req, res, next) => {
    const userLoggedIn = req?.session?.passport?.user;
    if (userLoggedIn) {
        return res.status(200).send(userLoggedIn.name)
    } else {
        return res.status(200).send("No one is Logged")
    }
})

router.post("/signup", async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;
    const summoner = await Summoner.findOne({ email: email });
    if (summoner) {
        return res.status(500).send("Usuario ya existente");
    } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const newSummoner = new Summoner({});
        newSummoner.name = name;
        newSummoner.email = email;
        newSummoner.password = hashPassword;
        await newSummoner.save();
        return res.status(200).send("Usuario creado!")
    }
})

router.post("/signin", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) return console.log(`Error signin 1: ${err}`);
        if(!user) return res.status(404).send("User not found");
        else {
            req.logIn(user, (err) => {
                if (err) return console.log(`Error signin 2: ${err}`);
                console.log(`Logeado! ${req.user}`)
            })
        }
        return res.send("Logueado")
    })(req, res, next)
})

router.get("/checkUser", (req, res, next) => {
    const userLoggedIn = req?.session?.passport?.user;
    if (userLoggedIn) {
        return res.send(true)
    } else {
        return res.send(false)
    }
})

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/summoner")
})

router.post("/addChampBanned", async (req, res, next) => {
    const { champName, summonerName } = req.body;
    const summoner = await Summoner.findOne({ name: summonerName })
    summoner.champsBanned = [...summoner.champsBanned, champName]
    summoner.bansCount++;
    await summoner.save();
    res.status(200).send(summoner);
})

router.get("/:summonerName/bans", async(req, res, next) => {
    const { summonerName } = req.params;
    const summoner = await Summoner.findOne({ name: summonerName })
    return res.status(200).send(summoner.champsBanned)
})

router.get("/:summonerName/bansComplete", async(req, res, next) => {
    const { summonerName } = req.params;
    const summoner = await Summoner.findOne({ name: summonerName })
    return res.status(200).send(summoner.champsBannedComplete)
})

module.exports = router;