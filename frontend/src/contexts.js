import React from 'react'

export const UserContext = React.createContext({
  user: {
    id: '',
    name: '',
    email: '',
    token: ''
  },
  setUser: () => {}
})
