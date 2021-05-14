export default function config() {
  return {
    access: {
      secret: process.env.access as string,
      expiresIn: process.env.accessExpiresIn as string,
    },
    token: {
      secret: process.env.token as string,
      expiresIn: process.env.tokenExpiresIn as string,
    },
  };
}
