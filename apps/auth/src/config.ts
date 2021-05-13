export default function config() {
  return {
    token: {
      secret: process.env.access as string,
      expiresIn: process.env.accessExpiresIn as string,
    },
  };
}
