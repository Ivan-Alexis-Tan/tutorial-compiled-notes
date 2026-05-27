import { useEffect, useState } from "react"

export default function Proj3PokemonApi() {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'

    const [pokemonDb, setPokemonDb] = useState({})
    const [searchPokemon, setSearchPokemon] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [pokemonInfo, setPokemonInfo] = useState({})
    const [isNameSearch, setIsNameSearch] = useState(true)

    useEffect(() => {
        async function getPokemon() {
            try {
                
                if (!isLoading) return null;
                if (searchPokemon === '') return null;
                if (!isNameSearch & searchPokemon <= 0) setSearchPokemon(0);

                console.log(`searching:`, pokemonUrl + searchPokemon)
                const resp = await fetch(pokemonUrl + `${searchPokemon}`)
                setPokemonDb(await resp.json())
            }
            catch(err) {
                console.log(err);
                setPokemonDb({});
                setErrorMessage(`Pokemon "${searchPokemon}" not found.`);
            }
            finally{
                setIsLoading(false)
            }
        }

        getPokemon()
        setSearchPokemon('')
    }, [isLoading])

    useEffect(() => {
        if (pokemonDb.id) {
            setPokemonInfo({
                id: pokemonDb.id,
                name: pokemonDb.name,
                types: pokemonDb.types.map(data => data.type.name),
                stats: pokemonDb.stats.reduce( (acc, val) => {
                    acc[val.stat.name] = val.base_stat
                    return acc
                },{})
            })
        }
    }, [pokemonDb])

    function getPokemonDb() {
        setIsLoading(true)
        setErrorMessage('')
        setPokemonDb(isNameSearch ? searchPokemon.toLowerCase() : Number(searchPokemon))
    }

    function keyUpSearch(e) {
        if (e.key !== 'Enter') return null;
        getPokemonDb()
    }

    function test() {
        console.log(pokemonDb.name)
        console.log(pokemonDb)
        console.log(pokemonInfo)
        console.log(pokemonDb.stats.reduce( (acc, val) => {
            console.log(capitalizeEachStr(val.stat.name, '-'))
            acc[val.stat.name] = val.base_stat

            return acc
        },{}))
        
        console.log('==================')
    };

    const PokemonTypes = () => {
        if (!pokemonInfo.types) return null;

        if (pokemonInfo.types.length == 1) {
            return <h3>{capitalizeStr(pokemonInfo.types[0])}</h3>
        }
        else {
            return <h3>{capitalizeStr(pokemonInfo.types[0])} | {capitalizeStr(pokemonInfo.types[1])}</h3>
        }
    }

    const PokemonStats = () => {
        if (!pokemonInfo.stats) return null;

        const statName = Object.keys(pokemonInfo.stats)
        return (
            <ul>{statName.map(stat => <li key={stat}>
                <strong>{capitalizeEachStr(stat, '-')}</strong>: {pokemonInfo.stats[stat]}
            </li>)}</ul>
        )
    }

    return (
        <div className="project-3-pokemon-api__container">
            <h1>Pokemon API DB</h1>

            <div>
                <label onClick={_ => setIsNameSearch(prev => !prev)}>{isNameSearch ? 'Name' : 'ID'}: </label>
                {isNameSearch
                    ? <input type="text" value={searchPokemon} 
                        onChange={e => setSearchPokemon(e.target.value)} 
                        placeholder="Pikachu" 
                        onKeyUp={e => keyUpSearch(e)}
                    />
                    : <input type="number" value={searchPokemon} 
                        onChange={e => setSearchPokemon(Number(e.target.value))} 
                        placeholder="25" 
                        onKeyUp={e => keyUpSearch(e)}
                        min={0} 
                    />
                }
                <button onClick={getPokemonDb}>🔍</button>
            </div>

            <div className="project-3-pokemon-api__info">
                <div className="project-3-pokemon-api__info-profile">
                    {pokemonDb.id && <p className="project-3-pokemon-api__info-id">
                        No. {pokemonDb.id}
                    </p>}

                    <h2 className="project-3-pokemon-api__info-name">
                        {pokemonDb.name ? capitalizeStr(pokemonDb.name) : errorMessage }
                    </h2>
                    
                    {pokemonDb.types && <PokemonTypes />}
                    
                    <div className="project-3-pokemon-api__info-sprites">
                        {pokemonDb.sprites && <img src={pokemonDb.sprites.front_default} alt={`default ${searchPokemon}`} />}
                        {pokemonDb.sprites && <img src={pokemonDb.sprites.front_shiny} alt={`shiny ${searchPokemon}`}/>}
                    </div>
                </div>

                <div className="project-3-pokemon-api__info-stats">
                    {pokemonDb.stats && 
                        <>
                            <h3>Base Stats:</h3>
                            <PokemonStats />
                        </>
                    }
                </div>
            </div>
            {/* <button onClick={test}>test</button> */}
        </div>
    )
} 

function capitalizeStr(str) {
    return `${str}`.charAt(0).toUpperCase() + `${str}`.slice(1)
}

function capitalizeEachStr(str, sep) {
    const strings = `${str}`.split(sep)
    return strings.map(string => `${string}`.charAt(0).toUpperCase() + `${string}`.slice(1)).join(' ')
}