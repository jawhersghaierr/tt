const authService = {
  login: async (payload) => {
    console.log('login payload:', payload)
    return { success: true }
  },

  logout: async () => {
    return { success: true }
  },
}

export default authService