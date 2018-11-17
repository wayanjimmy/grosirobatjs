const KEY = 'GROSIROBAT_CURRENT_USER'

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(KEY))
}

export function setCurrentUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function forgetCurrentUser() {
  localStorage.setItem(KEY, null)
}

export function isAuthenticated() {
  return !!getCurrentUser()
}

export function getAuthHeader() {
  const user = getCurrentUser()
  return { headers: { Authorization: `Bearer ${user.token}` } }
}
