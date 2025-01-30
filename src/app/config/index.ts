export const backUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.AWS_EC2_URL
    : process.env.AWS_EC2_URL
    // : 'http://127.0.0.1:3065';