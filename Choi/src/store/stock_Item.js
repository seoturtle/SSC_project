import React, { createContext, useState } from 'react';

export const StockContext = createContext()

const StockStore = (props) => {
    const [item, setItem] = useState('');

    return <StockContext.Provider value={{item, setItem}}>{props.children}</StockContext.Provider>

}  

export default StockStore;