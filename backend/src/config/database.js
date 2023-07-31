const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
  };
  
  const password = process.env.DB_PASS;
  const user = process.env.DB_USER;
  const MONGO_URI = process.env.MONGO_URI
  
  module.exports = {
    uri: MONGO_URI,
    options,
  };