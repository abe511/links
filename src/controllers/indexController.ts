import { Request, Response } from "express";

export const renderIndex = (req: Request, res: Response): void => {
    res.render("index", { items: "", length: "", error: "" });
}