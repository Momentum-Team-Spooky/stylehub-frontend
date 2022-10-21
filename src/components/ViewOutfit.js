import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DisplayOutfit } from "./DisplayOutfit";

export const ViewOutfit = ({token}) => {
    const [outfit, setOutfit] = useState(null);
    // const AuthStr = 'Token '.concat('af6053eea103fe7a3e9c9d9e4d054cf5f7a527d1')
    const {id} = useParams()


    useEffect(() => {
        axios.get(`https://stylehub.herokuapp.com/outfit/${id}`, {
            headers: {
                Authorization: `Token ${token}`
            }
            
        })
        .then((res) => 
        setOutfit(res.data))
        // console.log(res.data.closet_item))
    }, [token, id])

    return (
        <div>
            {outfit && (<div> <h1>
                {outfit.title}
            </h1>
            <DisplayOutfit token={token} outfit={outfit}/> </div>)
            }
        </div>

    )
}