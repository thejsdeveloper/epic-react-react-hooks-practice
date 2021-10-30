// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  const {status, error, pokemon} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    const getPokemon = async () => {
      try {
        setState({
          pokemon: null,
          error: null,
          status: 'pending',
        })
        const pokemon = await fetchPokemon(pokemonName)
        setState({
          error: null,
          status: 'resolved',
          pokemon,
        })
      } catch (error) {
        setState({
          status: 'rejected',
          pokemon: null,
          error,
        })
      }
    }
    getPokemon()
  }, [pokemonName])

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (status === 'idle') {
    return 'Submit a pokemon'
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  return new Error()
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
