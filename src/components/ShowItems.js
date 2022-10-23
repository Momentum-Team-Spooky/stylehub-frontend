import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Link } from 'react-router-dom'
import Fab from '@mui/material/Fab'
import axios from 'axios'

export const ShowItems = ({items, currOutfit, setCurrOutfit, token}) => {
    return (
        <div>
            <div className='item-list'>
                {items.map((item) => (
                    <div key={item.title} className='item-list'>
                        <Item
                        token={token}
                        currOutfit={currOutfit}
                        setCurrOutfit={setCurrOutfit}
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
                        />
                    </div>
                ))}
            </div>
        </div>
    )}

const Item = ({item, title, category, subcategory, color, size, material, source, brand, tag, image, token, currOutfit, setCurrOutfit}) => {
const [expanded, setExpanded] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)

const handleClick = (item) => {
    setExpanded(!expanded)
    setSelectedItem(item)
    console.log(selectedItem)
}  
const handleAddItem = (selectedItem, currOutfit, setCurrOutfit) => {
    console.log(selectedItem)
    if (Object.keys(currOutfit).length === 0) {
        axios
        .post(`https://stylehub.herokuapp.com/myoutfits/`,
        {
            draft: false,
            closet_item: [selectedItem.id],
        },{
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            setCurrOutfit(res.data)
        })
        .catch((err) => console.error(err))
    }
    else {
        
        axios
        .patch(`https://stylehub.herokuapp.com/outfit-detail/${currOutfit.id}`,
        {
            headers : {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
        })
        .catch((err) => console.error(err))
    }
}

return (
    <div className='item-container'>
        <div className='item' onClick={() => handleClick({item})}>
            <img className='item-photo' src ={image} alt={"Image for " + title}></img>
            <div className='expand-info'>
                <div className='item-fields'>
                { expanded ? ( category ? <p>category: {category}</p> : '') : ''}
                { expanded ? ( subcategory ? <p>subcategory: {subcategory}</p> : '') : ''}
                { expanded ? ( color ? <p>color: {color}</p> : '') : ''}
                { expanded ? ( size ? <p>size: {size}</p> : '') : ''}
                { expanded ? ( material ? <p>material: {material}</p> : '') : ''}
                { expanded ? ( brand ? <p>brand: {brand}</p> : '') : ''}
                { expanded ? ( source ? <p>source: {source}</p> : '') : ''}
                </div>
                <div className='item-tags'>
                { expanded ? ( tag ? <p>{tag}</p> : '') : ''}
                {/* tags might be an array or items, might need to map? */}
                <Fab
                component={Link} to="/current-outfit"
                position="absolute"
                align="center"
                style={{ color: "white", backgroundColor: "#9cc4d9",}}
                sx={{ borderRadius: 20, margin: '2', }}
                variant="contained"
                aria-label="add"
                onClick={() => handleAddItem(selectedItem, currOutfit, setCurrOutfit)}
                >
                <AddCircleIcon></AddCircleIcon> 
            </Fab>
                </div>
                
            </div>
        </div>
    </div>

)
}
