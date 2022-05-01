module.exports = {
  errorObject: {
    error: true,
    message: "Oops, something went wrong.Please try again later.",
  },

  USERNAME: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,

  REDIS_URL: "redis://127.0.0.1:6379",
};