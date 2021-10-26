// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    () => localStorage.getItem(key) || initialValue,
  )

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}
function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
