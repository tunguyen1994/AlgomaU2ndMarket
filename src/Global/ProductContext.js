import React, { createContext } from "react";
import { db } from '../components/firebase'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component{

    //define an initial state with empty array
    state={
        products:[]
    }

    componentDidMount(){
        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot =>{
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added'){
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProudctDes: change.doc.data().ProductDes,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })
    }

    render(){
        return(
            <ProductsContext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}