// TODO: Replace faulty image src with error image
// TODO: Conditional display of delete button for edit outfits

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export const DisplayOutfit = ({ outfit, location, setCurrOutfit, token }) => {
    // location determines how outfit displays depending on page it is used in. Options: 'myOutfits', 'editOutfit', 'viewOutfit'

    // changes image width based on location
    const size = location==='myOutfits' ? '50rem' : '100rem';

    // arrays to collect the items of different types
    const tops = [];
    const outers = [];
    const bottoms = [];
    const shoes = [];

    for (const item of outfit.closet_item) { 
        if (item.category==='top') {
            tops.push(item)
        } else if (item.category==='outerwear') {
            outers.push(item)
        } else if (item.category==='bottom') {
            bottoms.push(item)
        } else if (item.category==='shoes') {
            shoes.push(item)
        }        
    }


    // Clicking remove will remove closet item from outfit and display updated outfit
    const handleRemove = (closetItem) => {
        // get outfit items, remove requested item, transform to array of the id values
        const outfitItems = outfit.closet_item
        const updatedOutfitItems = outfitItems.filter(item => item.id !== closetItem.id)
        const updatedOutfitItemIDs = updatedOutfitItems.map(object => object.id)
        
        axios
            .patch(`https://stylehub.herokuapp.com/outfit-detail/${outfit.id}`,
            {
                closet_item: updatedOutfitItemIDs,
            },{
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                // Reformating response data to make closet_item a array of objects instead of just the id's.
                let outfitUpdate = res.data
                outfitUpdate.closet_item = updatedOutfitItems
                setCurrOutfit(outfitUpdate)
            })
            .catch((err) => console.error(err))
    }

    return (
        <>
            <div className='upperBody'>
                <div className='tops'>
                    {tops.map((top) => (
                        <div key={top.id} className='outfitItem'>
                            {top.item_image ? <img src={top.item_image} alt='' width={size} /> : ''}
                            {location==='editOutfit' && <IconButton className='outfitItemBtn' color="secondary" aria-label="remove item" onClick={() => {
                                handleRemove(top)
                            }
                            }>
                                <DeleteIcon style={{color:'#F06292'}} />
                            </IconButton>}
                        </div>
                    ))}
                </div>
                <div className='outers'>
                    {outers.map((outer) => (
                        <div key={outer.id} className='outfitItem'>
                            {outer.item_image ? <img src={outer.item_image} alt='' width={size} /> : ''}
                            {location==='editOutfit' && <IconButton className='outfitItemBtn' color="secondary" aria-label="remove item">
                                <DeleteIcon style={{color:'#F06292'}} />
                            </IconButton>}
                        </div>
                    ))}
                </div>
            </div>
            <div className='bottoms'>
                {bottoms.map((bottom) => (
                    <div key={bottom.id} className='outfitItem'>
                        {bottom.item_image ? <img src={bottom.item_image} alt='' width={size} /> : ''}
                        {location==='editOutfit' && <IconButton className='outfitItemBtn' color="secondary" aria-label="remove item">
                                <DeleteIcon style={{color:'#F06292'}} />
                            </IconButton>}
                    </div>
                ))}
            </div>
            <div className='shoes'>
                {shoes.map((shoe) => (
                    <div key={shoe.id} className='outfitItem'>
                        {shoe.item_image ? <img src={shoe.item_image} alt='' width={size} /> : ''}
                        {location==='editOutfit' && <IconButton className='outfitItemBtn' color="secondary" aria-label="remove item">
                                <DeleteIcon style={{color:'#F06292'}} />
                            </IconButton>}
                    </div>
                ))}
            </div>
        </>
    )
}