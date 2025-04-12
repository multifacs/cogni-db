import app from './app'

const port = 3000;

// Create Sequelize instance
import { sequelize } from "./models/index";
// Sync models with database
sequelize.sync();

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
