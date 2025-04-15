import app from "./app";
const MODE = process.env.MODE as string;

const port = 3000;

// Create Sequelize instance
import { sequelize } from "./models/index";
// Sync models with database
console.log(`Starting in ${MODE} mode`)
// if (MODE === "DEV") sequelize.sync({ force: true });
if (MODE === "PROD") sequelize.sync({ alter: true });

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
