export default () => ({
  app: {
    port: Number(process.env.PORT || 3001),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/metodo-yano',
  },
});
