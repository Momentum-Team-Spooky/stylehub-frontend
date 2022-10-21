import { ShowItems } from './ShowItems'
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import axios from 'axios'



export const Closet = ({currOutfit, setCurrOutfit, token}) => {
    const [items, setItems] = useState([])
    const [filteredList, setFilteredList] = useState([]);
    const [selectedCat, setSelectedCat] = useState("");
    const [selectedSubCat, setSelectedSubCat] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

useEffect(() => {
    axios
    .get('https://stylehub.herokuapp.com/mycloset/',
    {
        headers: {
            Authorization: `Token ${token}`,
        },
    })
    .then((res) => setItems(res.data))
}, [])

const filterByCategory = (filteredData) => {
    if (!selectedCat) {
    return filteredData;
    }

    const filteredItems = filteredData.filter(
    (item) => item.category === selectedCat
    );
    return filteredItems;
};

const filterByColor = (filteredData) => {
    if (!selectedColor) {
    return filteredData;
    }
    const filteredItems = filteredData.filter(
    (item) => item.color === selectedColor
    );
    return filteredItems;
};

const filterBySubCategory = (filteredData) => {
    if (!selectedSubCat) {
    return filteredData;
    }
    const filteredItems = filteredData.filter(
    (item) => item.subcategory === selectedSubCat
    );
    return filteredItems;
};

const handleCatChange = (event) => {
    setSelectedCat(event.target.value);
};
const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
};
const handleSubCatChange = (event) => {
    setSelectedSubCat(event.target.value);
};

useEffect(() => {
    var filteredData = filterByCategory(items);
    filteredData = filterBySubCategory(filteredData);
    filteredData = filterByColor(filteredData);
    setFilteredList(filteredData);
    console.log(filteredList)
    console.log(items)
}, [selectedCat, selectedColor]);


return (
    <div className="select-bar">
        <FormControl sx={{ m: 4, minWidth: 150 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCat}
            label="Category"
            onChange={handleCatChange}
            autoWidth
            >
                <MenuItem value='All types'>All Categories</MenuItem>
                <MenuItem value='tops'>tops</MenuItem>
                <MenuItem value='bottoms'>bottoms</MenuItem>
                <MenuItem value='outerwear'>outerwear</MenuItem>
                <MenuItem value='shoes'>shoes</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>
    <FormControl sx={{ m: 4, minWidth: 150 }}>
        <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
        <Select
        labelId="subcategory-select-label"
        id="subcategory-select"
        value={selectedSubCat}
        label="Subcategory"
        onChange={handleSubCatChange}
        >
            <MenuItem value='All Subcategories'>All Subcategories</MenuItem>
            <MenuItem value='Tops' disabled>Tops</MenuItem>
            <MenuItem value='buton-down'>button-down</MenuItem>
            <MenuItem value='dress'>dress</MenuItem>
            <MenuItem value='shirt'>shirt</MenuItem>
            <MenuItem value='sweater'>sweater</MenuItem>
            <MenuItem value='t-shirt'>t-shirt</MenuItem>
            <MenuItem value='Bottoms' disabled>Bottoms</MenuItem>
            <MenuItem value='pants'>pants</MenuItem>
            <MenuItem value='shorts'>shorts</MenuItem>
            <MenuItem value='skirt'>skirt</MenuItem>
            <MenuItem value='Outerwear' disabled>Outerwear</MenuItem>
            <MenuItem value='coat'>coat</MenuItem>
            <MenuItem value='jacket'>jacket</MenuItem>
            <MenuItem value='vest'>vest</MenuItem>
            <MenuItem value='Shoes' disabled>Shoes</MenuItem>
            <MenuItem value='boots'>boots</MenuItem>
            <MenuItem value='flats'>flats</MenuItem>
            <MenuItem value='heels'>heels</MenuItem>
            <MenuItem value='sandals'>sandals</MenuItem>
            <MenuItem value='slippers'>slippers</MenuItem>
            <MenuItem value='sneakers'>sneakers</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>
    <FormControl sx={{ m: 4, minWidth: 150 }}>
        <InputLabel id="color-select-label">Color</InputLabel>
        <Select
        labelId="color-select-label"
        id="color-select"
        value={selectedColor}
        label="Color"
        onChange={handleColorChange}
        >
            <MenuItem value='All Colors'>All Colors</MenuItem>
            <MenuItem value='green'>green</MenuItem>
            <MenuItem value='turquoise'>turquoise</MenuItem>
            <MenuItem value='blue'>blue</MenuItem>
            <MenuItem value='purple'>purple</MenuItem>
            <MenuItem value='red'>red</MenuItem>
            <MenuItem value='pink'>pink</MenuItem>
            <MenuItem value='orange'>orange</MenuItem>
            <MenuItem value='yellow'>yellow</MenuItem>
            <MenuItem value='white'>white</MenuItem>
            <MenuItem value='grey'>grey</MenuItem>
            <MenuItem value='black'>black</MenuItem>
            <MenuItem value='brown'>brown</MenuItem>
            <MenuItem value='multi'>multi</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>

    <div className="items-container">
    {items && <ShowItems items={items} currOutfit={currOutfit} setCurrOutfit={setCurrOutfit} token={token}/>}
    </div>      
    </div>

)
}