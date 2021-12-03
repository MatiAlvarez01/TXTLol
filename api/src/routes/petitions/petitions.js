const { Router } = require("express");
const Petition = require("../../models/petition");
const Summoner = require("../../models/summoner");

const router = Router();

router.get("/all", (req, res, next) => {
    Petition.find({})
        .then((response) => {
            return res.status(200).send(response)
        })
        .catch((err) => {
            return next(err)
        })
})

router.get("/:summonerName", (req, res, next) => {
    const { summonerName } = req.params;
    Petition.find({to: summonerName})
        .then((response) => {
            console.log(response)
            return res.status(200).send(response)
        })
        .catch((err) => {
            return next(err)
        })
})

router.get("/:summonerName/filter/accepted", (req, res, next) => {
    const { summonerName } = req.params;
    Petition.find({
        $and: [
            {to: summonerName},
            {status: "Accepted"}
        ]
    })
    .then((response) => {
        return res.status(200).send(response)
    })
    .catch((err) => {
        return next(err)
    })
})

router.get("/:summonerName/filter/rejected", (req, res, next) => {
    const { summonerName } = req.params;
    Petition.find({
        $and: [
            {to: summonerName},
            {status: "Rejected"}
        ]
    })
    .then((response) => {
        return res.status(200).send(response)
    })
    .catch((err) => {
        return next(err)
    })
})

router.get("/:summonerName/filter/pending", (req, res, next) => {
    const { summonerName } = req.params;
    Petition.find({
        $and: [
            {to: summonerName},
            {status: "Pending"}
        ]
    })
    .then((response) => {
        return res.status(200).send(response)
    })
    .catch((err) => {
        return next(err)
    })
})

router.get("/status/pending", async (req, res, next) => {
    Petition.find({status: "Pending"})
    .then((petitionsPending) => {
        console.log(petitionsPending)
        return res.status(200).send(petitionsPending)
    })
    .catch((err) => {
        return next(err)
    })
})

router.post("/new", async (req, res, next) => {
    const {
        to,
        champion,
        games,
        reason
    } = req.body;
    const userSessionName = req?.session?.passport?.user?.name;
    if(!userSessionName) return res.status(500).send("You need to Log in before create a new petition")
    const newPetition = new Petition({});
    newPetition.to = to;
    newPetition.from = userSessionName;
    newPetition.champion = champion;
    newPetition.games = games;
    newPetition.reason = reason;
    newPetition.alreadyVoted = [...newPetition.alreadyVoted, userSessionName]
    newPetition.positiveVotes = 1;
    await newPetition.save();
    const summoner = await Summoner.findOne({ name: userSessionName })
    summoner.bansStarted++;
    await summoner.save();
    return res.status(200).send(newPetition);
})

router.post("/editReason", async (req, res, next) => {
    const { petitionID, reason } = req.body;
    const userSessionName = req?.session?.passport?.user?.name;
    if(!userSessionName) return res.status(500).send("You need to Log in before edit any petition")
    const petitionSelected = await Petition.findById(petitionID);
    if (petitionSelected) {
        petitionSelected.reason = reason;
        petitionSelected.lastEdit = userSessionName;
        await petitionSelected.save();
        return res.status(200).send(petitionSelected)
    } else {
        return res.status(404).send("Petition not found")
    }
})

router.post("/addDefense", async (req, res, next) => {
    const { petitionID, accusedDefense } = req.body;
    const userSessionName = req?.session?.passport?.user?.name;
    if(!userSessionName) return res.status(500).send("You need to Log in before edit any petition")
    const petitionSelected = await Petition.findById(petitionID);
    if (petitionSelected.to === userSessionName) {
        petitionSelected.accusedDefense = accusedDefense;
        await petitionSelected.save();
        return res.status(200).send(petitionSelected)
    } else {
        return res.status(404).send("You can't add a Defense if you are not the accused.")
    }
})

router.post("/addGame", async (req, res, next) => {
    const { petitionID, game } = req.body;
    const userSessionName = req?.session?.passport?.user?.name;
    if(!userSessionName) return res.status(500).send("You need to Log in before edit any petition")
    const petitionSelected = await Petition.findById(petitionID);
    if (petitionSelected) {
        petitionSelected.games = [...petitionSelected.games, game]
        await petitionSelected.save();
        petitionSelected.lastEdit = userSessionName;
        return res.status(200).send(petitionSelected);
    } else {
        return res.send(404).send("Petition not found");
    }
})

router.post("/votePositive", async (req, res, next) => {
    const { petitionID } = req.body;
    const userSessionName = req?.session?.passport?.user?.name;
    if(!userSessionName) return res.status(500).send("You need to Log in before vote any petition")
    const petitionSelected = await Petition.findById(petitionID);
    if (petitionSelected.alreadyVoted.includes(userSessionName)) {
        return res.status(500).send(`${userSessionName} already voted this petition`);
    } else
     if (petitionSelected.status === "Accepted" || petitionSelected.status === "Rejected") {
        return res.status(500).send("Petition is not Pending anymore")
    } else {
        petitionSelected.positiveVotes++;
        petitionSelected.alreadyVoted = [...petitionSelected.alreadyVoted, userSessionName]
        petitionSelected.lastVote = userSessionName;
        if (petitionSelected.positiveVotes >= 7) {
            const petitionDate = Date.parse(petitionSelected.createdAt)
            const oneDay = 24*60*60*1000;
            let endDate;
            let index;
            let banCount = 0
            let ban = {
                champion: petitionSelected.champion,
                count: 0,
                date: petitionSelected.createdAt,
                till: (oneDay * 7) + petitionDate
            }
            const summoner = await Summoner.findOne({ name: petitionSelected.to})
            if(summoner.champsBanned.includes(petitionSelected.champion)) {
                const objBan = summoner.champsBannedComplete.find(obj => obj.champion === petitionSelected.champion)
                index = summoner.champsBannedComplete.indexOf(objBan);
                if (objBan.banCount === 0) {
                    endDate = (oneDay * 7) + petitionDate;
                    banCount = 1;
                } else if (objBan.banCount === 1) {
                    endDate = (oneDay * 30) + petitionDate;
                    banCount = 2;
                } else if (objBan.banCount === 2) {
                    endDate = (oneDay * 60) + petitionDate;
                    banCount = 3;
                } else {
                    endDate = Date.parse("2022-12-1")
                    banCount = objBan.banCount + 1; 
                }
                ban = {
                    champion: petitionSelected.champion,
                    count: banCount,
                    date: petitionSelected.createdAt,
                    till: endDate
                }
                summoner.champsBannedComplete.splice(index, 1, ban)
            } else {
                summoner.champsBanned = [...summoner.champsBanned, petitionSelected.champion]
                summoner.champsBannedComplete = [...summoner.champsBannedComplete, ban]
            }
            summoner.bansCount++;
            petitionSelected.status = "Accepted"
            await summoner.save();
        }
        await petitionSelected.save()
        return res.status(200).send(petitionSelected);
    }
})

router.post("/voteNegative", async (req, res, next) => {
    const { petitionID } = req.body;
    const userSessionName = req?.session?.passport?.user.name;
    if(!userSessionName) return res.status(500).send("You need to Log in before vote any petition")
    const petitionSelected = await Petition.findById(petitionID);
    if (petitionSelected.alreadyVoted.includes(userSessionName)) {
        return res.status(500).send(`${userSessionName} already voted this petition`);
    } else {
        petitionSelected.negativeVotes++;
        petitionSelected.alreadyVoted = [...petitionSelected.alreadyVoted, userSessionName]
        petitionSelected.lastVote = userSessionName;
        if (petitionSelected.negativeVotes === 7) {
            petitionSelected.status = "Rejected"
        }
        await petitionSelected.save()
        return res.status(200).send(petitionSelected);
    }
})

module.exports = router;