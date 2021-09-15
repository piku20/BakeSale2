import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native';
import React, {FC} from "react";

import DealItem from './dealItem';

interface Props{
    deals: any[];
    onItemPress: ()=>void;
};

const DealList:FC<Props> = ({
    deals,
    onItemPress,
})=> {  
    
    return(
        <View style={styles.list}>
            <FlatList 
                data = {deals}
                renderItem = {({item})=>(
                    <DealItem
                        deal={item}
                        onPress = {onItemPress}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list:{
        backgroundColor: '#eee',
        width: '100%',
    },    
});

export default DealList;