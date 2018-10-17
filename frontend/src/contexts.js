import React from 'react'

export const CurrentUserContext = React.createContext({
  currentUser: {
    id: '',
    email: '',
    name: ''
  },
  setCurrentUser: () => {}
})
