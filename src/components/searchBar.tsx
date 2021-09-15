import React, {FC, useCallback, useRef, useState} from "react";
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import { debounce } from "lodash";

interface Props{
    searchDeals: ()=> void;
    initialSearchTerm: string;
};

const SearchBar:FC<Props> = ({
    searchDeals,
    initialSearchTerm,
})=>{
    
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

    const inputElement = useRef();

    searchDeals = (searchTerm) =>{
        searchDeals(searchTerm);
        inputElement.current.blur();
    }

    const debouncedSearchDeals = debounce(searchDeals, 300);
    
    const handleChange = (searchTerm: string) => {
        debouncedSearchDeals(setSearchTerm(searchTerm));
    }

    
    return(
        <TextInput 
            ref = {(inputElement) => { inputElement = inputElement;}}
            value = {searchTerm}
            placeholder = "Search All Deals"
            style = {styles.input}
            onChangeText = {handleChange}            
        />
    );
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        marginHorizontal: 12,
    },
});

export default SearchBar;