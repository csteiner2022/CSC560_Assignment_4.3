import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const fellowshipmemberRouter = express.Router();
fellowshipmemberRouter.use(express.json());

//Helms Deep
fellowshipmemberRouter.get('/helms-deep-winners', async (req, res) => {
    try {
        const topFellowshipmember = await collections?.fellowshipmembers?.find().sort({ helms_deep_kills: -1 }).limit(3).toArray();
        res.status(200).json(topFellowshipmember);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Pelennor
fellowshipmemberRouter.get('/pelennor-winners', async (req, res) => {
    try {
        const topFellowshipmember = await collections?.fellowshipmembers?.find().sort({ pelennor_fields_kills: -1 }).limit(3).toArray();
        res.status(200).json(topFellowshipmember);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Refused the ring
fellowshipmemberRouter.get('/refused-the-ring', async (req, res) => {
    try {
        const topFellowshipmember = await collections?.fellowshipmembers?.find({ "willingly_refused_the_ring_of_power": "Yes" }).toArray();
        res.status(200).json(topFellowshipmember);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Sort-by-total-kills
fellowshipmemberRouter.get('/sort-by-total-kills', async (req, res) => {
    try {
        const topFellowshipmember = await collections?.fellowshipmembers?.aggregate([
    {
        $addFields: {
            total_kills: { $sum: ["$helms_deep_kills", "$pelennor_fields_kills"] }
        }
    },
    {
        $sort: { total_kills: -1 }
    }
]).toArray();
        res.status(200).json(topFellowshipmember);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//Hobbits
fellowshipmemberRouter.get('/hobbits', async (req, res) => {
    try {
        const topFellowshipmember = await collections?.fellowshipmembers?.find({ "race": "Hobbit" }).toArray();
        res.status(200).json(topFellowshipmember);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET all fellowshipmembers
fellowshipmemberRouter.get("/", async (_req, res) => {
    try {
        const fellowshipmembers = await collections?.fellowshipmembers?.find({}).toArray();
        res.status(200).send(fellowshipmembers);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// GET fellowshipmember by ID
fellowshipmemberRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const fellowshipmember = await collections?.fellowshipmembers?.findOne(query);

        if (fellowshipmember) {
            res.status(200).send(fellowshipmember);
        } else {
            res.status(404).send(`Failed to find a fellowshipmember: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a fellowshipmember: ID ${req?.params?.id}`);
    }
});

// POST a new fellowshipmember
fellowshipmemberRouter.post("/", async (req, res) => {
    try {
        const fellowshipmember = req.body;
        const result = await collections?.fellowshipmembers?.insertOne(fellowshipmember);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new fellowshipmember: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new fellowshipmember.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// PUT (update) an existing fellowshipmember by ID
fellowshipmemberRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const fellowshipmember = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.fellowshipmembers?.updateOne(query, { $set: fellowshipmember });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a fellowshipmember: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a fellowshipmember: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a fellowshipmember: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

// DELETE a fellowshipmember by ID
fellowshipmemberRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.fellowshipmembers?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a fellowshipmember: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a fellowshipmember: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a fellowshipmember: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});




