import express from 'express';
import recipeRoutes from "./routes/index.js";
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});