const sequelize = require('./config/sequelize'); 
const app = require('./server'); 

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
