import { useState } from "react";
import img from "../../img/cuadrados.jpg"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios"
import "./Product.css"
const Product = () => {
  const[preferenceId, setPreferenceId] = useState(null);
  
  initMercadoPago('APP_USR-f326f773-f3e1-4cf3-909d-ba3b27b7660e');

  const createPreference = async () =>  {
    try   {
      const response = await axios.post("http://localhost:8080/create_preference", {
        description: "nuevo producto",
        price: 100,
        quantity: 1,
        currency_id: "ARS"
    });

    const { id } = response.data;
    return id;
  } catch (error)   {
    console.log(error)
  }
  };

  const handlebuy = async () =>  {
    const id = await createPreference();
    if (id) {


      setPreferenceId(id);
    }
  };

  return (
    <div className='card-product-container'>
      <div className='card-product'>
        <div className='card'>
            <img src={img} alt='producto1'/>
            <h3>Producto1</h3>
            <p className='price'>$ 500</p>
            <button onClick={handlebuy}>Buy</button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
      </div>
    </div>
  );
};

export default Product;
