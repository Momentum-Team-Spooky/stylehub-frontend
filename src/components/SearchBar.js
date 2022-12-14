import axios from "axios"
import { useState } from "react"

export const SearchBar =
({setItems, token}) => {
    const [searchText, setSearchText] = useState('')

    const handleSearchCloset = (e) => {
        e.preventDefault();

        axios
            .get(`https://stylehub.herokuapp.com/mycloset/?search=${searchText}`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data)
                setSearchText('')
                setItems(res.data)
            })
            .catch((err) => console.error(err))
    }

    return(
        <div>
        <form onSubmit={handleSearchCloset}
        style={{marginBottom: 10}}>
        <input
            type='text'
            id='search'
            className='input'
            placeholder="search closet items"
            value={searchText}
            onChange = {(e) => setSearchText(e.target.value)}
        ></input>
        </form>
        </div>
    )
}
