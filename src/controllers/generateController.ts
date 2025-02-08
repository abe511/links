import { Request, Response } from "express";
import { getCombinations } from "../utils/getCombinations";
import { fetchItems } from "../services/itemsService";
import { insertCombination } from "../services/combinationService";
import { insertResponse } from "../services/responseService";

export const generateCombinations = async (req: Request, res: Response) => {
    const { items, length } = req.body;
  
    // validate user input
    if (!Array.isArray(items) || typeof length !== "number" || length <= 0) {
        res.status(400).json({ error: "Input not valid" });
    }
  
    try {
        // get types from the db ("A", "B", "C", etc..)
        const types = await fetchItems(items.length);
        // number the types and generate all possible combinations of given length
        const result = await getCombinations(items, types, length);
        // insert JSON object of combinations into the db
        await insertCombination(JSON.stringify(result));
        // insert JSON object of the response into the db
        await insertResponse(JSON.stringify({ success: result }));

        res.json({ result });
    } catch (error) {
        console.error("Database query error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        await insertResponse(JSON.stringify({ error: errorMessage }));
        res.status(500).json({ error: "Internal Server Error" });
    }
  }