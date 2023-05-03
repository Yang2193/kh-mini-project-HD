import { createContext, useState } from "react";

export const UserContext = createContext(null);



const UserStore = (props) => {
    const [address, setAddress] = useState({});
    const [category, setCategory] = useState([]);
    const [price, setPrice ] = useState([]);
    const [rating, setRating] = useState(null);
    const [region, setRegion] = useState("");
    const [checkedCities, setCheckedCities] = useState([]);
    const [cities, setCities] = useState([]);

    return(
        <UserContext.Provider value = {{address, setAddress, category, setCategory, price, setPrice, rating, setRating, region, setRegion, checkedCities, setCheckedCities, cities, setCities}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserStore;