export default function config() {
  return {
    token: {
      secret: process.env.token as string,
      expiresIn: process.env.tokenExpiresIn as string,
    },
  };
}
