const apiHost: string = 'https://bakesaleforgood.com';

export const fetchInitialDeals = async() => {
    try{
        const response = await fetch(apiHost + '/api/deals/');
        const responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(error);
    }
};

export const fetchDealDetail = async(dealId: string) => {
    try{
        const response = await fetch(apiHost + '/api/deals/' + dealId);
        const responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(error);
    }
};

export const fetchDealSearchResults = async(searchTerm: string) => {
    try{
        const response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm);
        const responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(error);
    }
};