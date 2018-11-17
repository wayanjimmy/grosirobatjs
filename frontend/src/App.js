import React from 'react'

import './App.css'

class App extends React.Component {
  state = {
    users: []
  }

  fetchUsers() {
    return fetch('/api/users')
      .then(r => r.json())
      .then(res => res.result.results)
  }

  async componentDidMount() {
    const users = await this.fetchUsers()
    this.setState({ users })
  }

  render() {
    const { users } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </header>
      </div>
    )
  }
}

export default App
