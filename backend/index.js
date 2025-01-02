import express from  "express";

const app = express();

app.get("/api/products", (req, res) => {
    const products = [
            {
                id:1, 
                name:"Sofa Set", 
                price: 300, 
                image:"https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
                id:2, 
                name:"Chair", 
                price: 50, 
                image:"https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
                id:3, 
                name:"Bed", 
                price: 500, 
                image:"https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
                id:4, 
                name:"Standing Mirror", 
                price: 200, 
                image:"https://images.pexels.com/photos/3097112/pexels-photo-3097112.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
                id:5, 
                name:"Office Chair", 
                price: 150, 
                image:"https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
    ]
    if(req.query.search){
        console.log(req.query.search)
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(req.query.search.toLowerCase()));
        res.send(filteredProducts)
        return
    }
    setTimeout(()=>{
        res.send(products)
    }, 3000)
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server started at " + port)
})