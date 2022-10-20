// TODO: Delete button functionality for individual items
// TODO: Save button should move user to view outfits page
// TODO: Tags input field
// TODO: Finalize Tag selection list

// Note: Debounce code for Outfit Name input/API call is based on: https://usehooks.com/useDebounce/

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SaveButton } from "./SaveButton";
import { DisplayOutfit } from './DisplayOutfit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useEffect, useState } from "react"
import { WithContext as ReactTags } from 'react-tag-input';


export const CurrentOutfit = ({ currOutfit, setCurrOutfit, loading, setLoading }) => {
    const [name, setName] = useState(currOutfit.title)
    const debouncedName = useDebounce(name, 500)


    // 500ms after user stops typing Outfit Name input, API call will save name
    useEffect(() => {
        if (debouncedName) {
            updateName(debouncedName, currOutfit)
        }
    }, [debouncedName])

    // Clicking save will move outfit out of draft (changing current outfit to empty) and navigate user to View Outfit page
    const handleSubmit = () => {
        axios
            .patch(`https://stylehub.herokuapp.com/outfit/${currOutfit.id}`,
            {
                draft: false,
            },{
                headers: {
                    Authorization: `Token af6053eea103fe7a3e9c9d9e4d054cf5f7a527d1`,
                },
            })
            .then((res) => {
                setCurrOutfit({})
            })
            .catch((err) => console.error(err))
    }
    
    // Clicking delete will delete outfit and change current outfit to empty
    const handleDeleteOutfit = () => {
        axios
            .delete(`https://stylehub.herokuapp.com/outfit/${currOutfit.id}`,
            {
                headers: {
                    Authorization: `Token af6053eea103fe7a3e9c9d9e4d054cf5f7a527d1`,
                },
            })
            .then((res) => {
                setCurrOutfit({})
            })
            .catch((err) => console.error(err))
    }

    // Tag code
    // Tag documentation found here: https://www.npmjs.com/package/react-tag-input

    // pull tag info from currOutfit so they display in form
    const currOutfitTags = currOutfit.tag
    const currOutfitTagsObj = currOutfitTags.map((x) => ({id: x, text: x}))
    console.log(currOutfitTags)
    console.log(currOutfitTagsObj)

    const [tags, setTags] = React.useState(currOutfitTagsObj)

    const possibleTags = ['spring', 'summer', 'fall', 'winter']
    const suggestions = possibleTags.map(possibleTag => {
    return {
        id: possibleTag,
        text: possibleTag
    };
    });

    const KeyCodes = {
        comma: 188,
        enter: 13
    };
    
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    
    const handleAddition = tag => {
        setTags([...tags, tag]);
    };
    
    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
    };
    
    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };


    // Save tags after user updates
    useEffect(() => {
        console.log(currOutfit.tag)
        console.log(tags)
        let tagsToPost = []
        for (const tag of tags) {
            tagsToPost.push(tag.id)
        }
        console.log(tagsToPost)

        axios
        .patch(`https://stylehub.herokuapp.com/outfit/${currOutfit.id}`,
        {
            tag: tagsToPost,
        },{
            headers: {
                Authorization: `Token af6053eea103fe7a3e9c9d9e4d054cf5f7a527d1`,
            },
        })
        .then((res) => {
            setCurrOutfit(res.data)
        })
        .catch((err) => console.error(err))
    }, [tags])


    // Loading symbol will display until currOutfit API call returns (in App.js) 
    if (loading) {
        return(
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    } else {
        return(
            <>
                <h1>Current Outfit</h1>
                <div><label htmlFor='name'>Outfit Name: </label></div>
                <div><input
                    type='text'
                    id='name'
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                    required
                ></input></div>

                <div>Add tags:</div>
                <ReactTags
                tags={tags}
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="top"
                autocomplete
                allowDeleteFromEmptyInput={false}
                />

                <p>{Object.keys(currOutfit).length === 0 ? "You haven't starting building an outfit yet. " : `You have ${currOutfit.closet_item.length} closet items in your outfit so far. `}
                <a href='/'>Go to your closet to add items to your outfit.</a></p>
                {Object.keys(currOutfit).length === 0 ? "" :
                <><div>
                    <DisplayOutfit outfit={currOutfit} location='editOutfit' setCurrOutfit={setCurrOutfit} />
                </div>
                <IconButton color="primary" aria-label="delete outfit" 
                onClick={() => {
                    handleDeleteOutfit()
                }
                }
                >
                    <DeleteIcon style={{color:'#F06292'}} />
                </IconButton>
                <div onClick={
                    () => {
                    handleSubmit()
                }
                }>
                    <SaveButton />
                </div></>}
            </>
        )
    }
}

// API call for outfit name
function updateName(nameInput, currOutfit) {
    axios
        .patch(`https://stylehub.herokuapp.com/outfit/${currOutfit.id}`,
        {
            title: nameInput,
        },{
            headers: {
                Authorization: `Token af6053eea103fe7a3e9c9d9e4d054cf5f7a527d1`,
            },
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => console.error(err))
}

// Used to set how often text input calls API, since we want it to save as user enters info
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return() => {
            clearTimeout(handler)
        }
    }, [value, delay])
        return debouncedValue
}