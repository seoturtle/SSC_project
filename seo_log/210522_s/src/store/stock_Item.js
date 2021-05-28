import React, { createContext, useState } from 'react';

export const StockContext = createContext()

const StockStore = (props) => {
    const [storeCode, setStoreCode] = useState();
    const [storeName, setStoreName] = useState();

    return <StockContext.Provider value={{storeCode, setStoreCode, storeName, setStoreName}}>{props.children}</StockContext.Provider>

}  

export default StockStore;