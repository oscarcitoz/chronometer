import express, { Request, Response } from "$express";
import Chronometer from "../models/chronometer.ts";
import chronometerRepository from "../repositories/chronometerRepository.ts";

class Server {
    constructor() {
        console.log("Upload Server");
        const app = express();

        app.use(express.json());

        app.get(
            "/api/ms/chronometer/health",
            (_req: Request, res: Response) => {
                res.json({ "status": "ok" });
            },
        );

        app.post("/api/ms/chronometer", async (req: Request, res: Response) => {
            try {
                const chronometerData = req.body as Chronometer;
                await chronometerRepository.upsert(
                    chronometerData,
                );
                res.status(200).json({
                    message: "Chronometer successfully processed",
                });
            } catch (error) {
                console.error("Error processing chronometer:", error);
                res.status(400).json({ error: error.message || "An error occurred"});
            }
        });

        app.delete(
            "/api/ms/chronometer/:reference_id",
            async (req: Request, res: Response) => {
                try {
                    const referenceId = req.params.reference_id;
                    const chronometer = await chronometerRepository
                        .findByReferenceId(referenceId);

                    if (!chronometer) {
                        return res.status(404).json({
                            error: "Chronometer not found",
                        });
                    }

                    await chronometerRepository.delete(chronometer._id);
                    res.status(200).json({
                        message: "Chronometer successfully deleted",
                    });
                } catch (error) {
                    console.error("Error deleting chronometer:", error);
                    res.status(500).json({ error: "Internal server error" });
                }
            },
        );

        app.get(
            "/api/ms/chronometer/:reference_id",
            async (req: Request, res: Response) => {
                try {
                    const referenceId = req.params.reference_id;
                    const chronometer = await chronometerRepository
                        .findByReferenceId(referenceId);

                    if (!chronometer) {
                        return res.status(404).json({
                            error: "Chronometer not found",
                        });
                    }

                    res.status(200).json(chronometer);
                } catch (error) {
                    console.error("Error Searching chronometer:", error);
                    res.status(500).json({ error: "Internal server error" });
                }
            },
        );

        app.listen(8080);
    }
}

export default Server;
