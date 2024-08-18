import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { fellowshipmemberRouter } from "./fellowshipmember.routes";


const ATLAS_URI = "mongodb+srv://einsteiner1:<password>@fellowshipdb.gdg03.mongodb.net/?retryWrites=true&w=majority&appName=FellowshipDB";

if (!ATLAS_URI) {
  console.error("No ATLAS_URI environment variable has been defined in config.env");
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/fellowshipmembers", fellowshipmemberRouter);

    
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch(error => console.error(error));
