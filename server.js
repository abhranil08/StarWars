import express from 'express';
import Routes from "./Routes/Routes.js";
import favouriteRoutes from "./Routes/favouriteRoutes.js";
import searchRoutes from "./Routes/searchRoutes.js";

// Using global map for the assignment -> but needed to implement DB here for future
export const favouritesByUser = {};
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api", Routes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => res.send("Welcome to the StarWars API!"));

app.listen(port, () => {
  console.log(`Favourites app listening at http://localhost:${port}`);
});