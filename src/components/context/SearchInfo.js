import { createContext, useState } from "react";

export const SearchContext = createContext(null);

const SearchStore = (props) => {
    const [address, setAddress] = useState([]);
    const [menu, setMenu] = useState([]);
    const [price, setPrice ] = useState([]);
    const [rating, setRating] = useState([]);

    return(
        <SearchContext.Provider value = {{address, setAddress, menu, setMenu, price, setPrice, rating, setRating}}>
            {props.children}
        </SearchContext.Provider>
    );
}

export default SearchStore;