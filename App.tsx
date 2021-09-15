import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {
  fetchDealDetail,
  fetchDealSearchResults,
  fetchInitialDeals,
} from './src/ajax';

import DealDetail from './src/components/dealDetail';
import DealItem from './src/components/dealItem';
import DealList from './src/components/dealList';
import SearchBar from './src/components/searchBar';
import SplashScreen from './src/components/splashScreen';

const App =()=>{
  
  const [deals, setDeals] = useState([]);
  const [dealsFromSearch, setDealsFromSearch] = useState<any>([]);
  const [currentDealId, setCurrentDealId] = useState<string>('');
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('');
  
  
  useEffect(async () => {
    setDeals(await fetchInitialDeals());
    console.log(currentDeal());  
  }, []);

  const searchDeals = async(searchTerm: string) => {
    let dealsFromSearch = [];
    if(searchTerm){
      setDealsFromSearch(await fetchDealSearchResults(searchTerm));
    }
    setActiveSearchTerm(searchTerm);
    setDealsFromSearch(activeSearchTerm);
  }
  
  const setCurrentDeal = (dealId: string)=>{
    setCurrentDealId(dealId);
  }

  const unsetCurrentDeal = ()=> {
    setCurrentDealId('');
  };
  
  const currentDeal:any = ()=> {
    //array.find(element => element > 10)    
    return deals.find((deal)=> deal.key === currentDealId);
  }

  if(currentDealId){
    return(
      <View style={styles.main}>
        <DealDetail 
          initialDealData = {currentDeal}
          onBack = {unsetCurrentDeal}
        />
      </View>
    );
  }

  const dealsToDisplay = 
    dealsFromSearch.length > 0 ? dealsFromSearch : deals;

  if(dealsToDisplay.length > 0){
    return(
      <View style = {styles.main}>
        <SearchBar 
          searchDeals = {searchDeals}
          initialSearchTerm = {activeSearchTerm}
        />
        <DealList 
          deals = {dealsToDisplay}
          onItemPress = {setCurrentDeal}
        />
      </View>
    );
  }

  return(
    <SplashScreen />
  );
}

const styles = StyleSheet.create({
  main:{
    marginTop: 30,
  },
});

export default App;