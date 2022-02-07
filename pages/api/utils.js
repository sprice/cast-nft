export const ironOptions = () => {
  return {
    cookieName: 'siwe',
    password: process.env.SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
}
