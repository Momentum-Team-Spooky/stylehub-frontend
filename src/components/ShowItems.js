import { useState } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete} from '@mui/icons-material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from "react-router-dom";


export const ShowItems = ({items, setItems, url, currOutfit, setCurrOutfit, setLoading, token, draftItems}) => {
    return (
        <div>
            <div className='item-list'>
                {items.map((item, index) => (
                    <div key={index} className='item-list'>
                        <Item
                        item={item}
                        title={item.title}
                        category={item.category}
                        subcategory={item.subcategory}
                        color={item.color}
                        size={item.size}
                        material={item.material}
                        source={item.source}
                        brand={item.brand}
                        tag={item.tag}
                        image={item.item_image}
                        currOutfit={currOutfit}
                        setCurrOutfit={setCurrOutfit}
                        setLoading={setLoading}
                        setItems={setItems}
                        url={url}
                        token={token}
                        draftItems={draftItems}
                        />
                    </div>
                ))}
            </div>
        </div>
    )}


const Item = ({item, title, category, subcategory, color, size, material, source, brand, tag, image, currOutfit, setCurrOutfit, setLoading, setItems, draftItems, url, token}) => {

    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)
    const [open, setOpen] = React.useState(false);

const handleAddItem = (newItem) => {
    if (Object.keys(currOutfit).length === 0) {
        axios
        .post(`https://stylehub.herokuapp.com/myoutfits/`,
        {
            closet_item: [newItem.id],
        },{
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            let newOutfit = res.data
            newOutfit.closet_item = [newItem]
            setCurrOutfit(newOutfit)
        })
        .catch((err) => console.error(err))
    } else {
        const outfitItems = currOutfit.closet_item
        const outfitItemsArray = Array.isArray(outfitItems) ? outfitItems : [outfitItems]
        const updatedOutfitItems = [ ...outfitItemsArray, newItem]
        const updatedOutfitItemIDs = updatedOutfitItems.map(object => object.id)
        setLoading(true)
        axios
        .patch(`https://stylehub.herokuapp.com/outfit/${currOutfit.id}`,
        {
            closet_item: updatedOutfitItemIDs,
        },{
            headers : {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            let outfitUpdate = res.data
            outfitUpdate.closet_item = updatedOutfitItems
            setCurrOutfit(outfitUpdate)
            setLoading(false)
            navigate('/current-outfit')
        })
        .catch((err) => console.error(err))
    }
}

const handleDeleteItem = (deletedItem) => {
    axios
        .delete(`https://stylehub.herokuapp.com/closet-item/${deletedItem.id}`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            axios
            .get(url,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => setItems(res.data))
        })
        .catch((err) => console.error(err))
}

const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    }));
    
        const [beenChecked, setBeenChecked] = useState(false)

        const handleExpandClick = () => {
        setExpanded(!expanded);
        };

    const handleClickOpen = () => {
        setOpen(true);
    };
        
    const handleClose = () => {
        setOpen(false);
    };
        

    return (
        <div>
            <Grid2
            justifyContent="center"
            container 
            rowGap={1} 
            columnGap={1}
            >
            <Grid2 xs={11.5}>
            <Card
            sx={{ maxWidth: 150 }}>
            <CardMedia
            component="img"
            height="194"
            image={image}
            alt={"Image for " + title}
            />

            <Typography variant="body2" color="text.secondary">
                {/* {brand} {subcategory} */}
            </Typography>
            
            <CardActions disableSpacing>

                {(draftItems[0] || {closet_item:[]}).closet_item.some((elem) => elem === item.id ) || beenChecked ? 
            <IconButton           
            aria-label="add-item"
            style={{color: '#b19cd9'}}
            >
                <LibraryAddCheckIcon />
            </IconButton> :
                
            <IconButton 
            onClick={() => {
                handleAddItem(item)
                setBeenChecked (true)
            }}
            aria-label="add-item"
            >
                <LibraryAddIcon />
            </IconButton>
            }

            <IconButton aria-label="delete-item" onClick={handleClickOpen}>
                <Delete />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                    handleDeleteItem(item)
                    handleClose()
                    }} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>

            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography
                fontWeight='bold'>
                category <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {category} <br></br> <br></br>
                </Typography>

                <Typography
                fontWeight='bold'>
                subcategory <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {subcategory} <br></br><br></br>
                </Typography>

                <Typography
                fontWeight='bold'>
                color <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {color} <br></br><br></br>
                </Typography>

                <Typography
                fontWeight='bold'>
                size <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {size} <br></br><br></br>
                </Typography>

                <Typography
                fontWeight='bold'>
                material <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {material} <br></br><br></br>
                </Typography>

                <Typography
                fontWeight='bold'>
                brand <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {brand} <br></br><br></br>
                </Typography>

                <Typography
                fontWeight='bold'>
                source <br></br>
                </Typography>

                <Typography
                fontStyle='italic'>
                {source} <br></br><br></br>
                </Typography>

            </CardContent>
            </Collapse>
        </Card>
        </Grid2>
        </Grid2>
        
        </div>
    );
}