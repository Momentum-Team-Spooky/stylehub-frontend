import { Box } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";
import { DisplayOutfit } from './DisplayOutfit'
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from "@mui/material/IconButton";
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import { useParams } from "react-router-dom";

export const ViewOutfits = ({token}) => {
    const url = 'https://stylehub.herokuapp.com/myoutfits/'
    const [outfits, setOutfits] = useState(null);

    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: `Token ${token}`
            }
            
        })
        .then((res) => 
        setOutfits(res.data))
        // console.log(res.data.closet_item))
    }, [token])

    if(outfits) {
        return(
            <div>
            <h1>My Outfits</h1>
                <Grid2 container rowGap={2} columnGap={2}>
                    {outfits.map((outfit) => (
                        <Grid2 xs={3} key={outfit.id}>
                            <Card
                                elevation={3}>
                                <CardActionArea 
                                component={Link} 
                                to={`/outfit/${outfit.id}`}>
                                <CardContent>
                            <DisplayOutfit
                                token={token}
                                outfit={outfit}
                                location='myOutfits'
                                />
                                {outfit.title}
                                </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

            </div>

        )
    }

    return (
        <div>

        </div>
    )
}