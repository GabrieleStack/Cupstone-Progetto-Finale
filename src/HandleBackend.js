import React from 'react';
import { useState, useEffect } from 'react';

export default function HandleBackend() {
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', image: '', tipology: '', price: '', year: ''});
    const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', image: '', tipology: '', price: '', year: ''});

    useEffect(() => {
        AllProduct();
    }, []);

    const AllProduct = () => {
        fetch('http://localhost:3001/api/wine')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Errore nella fetch');
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
                console.error('Errore nella richiesta della fetch', err);
            });
    };

    const oneProduct = (wineId) => {
        fetch(`http://localhost:3001/api/wine/${wineId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Errore nella fetch di un prodotto singolo');
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
                console.error('Errore nella richiesta della fetch', err);
            });
    };

    const addProducts = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/wine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProduct(prevProducts => [...prevProducts, data]);
                setNewProduct({ name: '', image: '', tipology: '', price: '', year: ''}); 
            })
            .catch(err => {
                console.error('Errore nel post del prodotto', err);
            });
    };
    

    const patchProduct = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/api/wine/${updateProduct.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updateProduct.name,
                image: updateProduct.image,
                tipology: updateProduct.tipology,
                price: updateProduct.price,
                year: updateProduct.year,
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Errore nel patch del prodotto');
                }
                return res.json();
            })
            .then(data => {
                setProduct(prevProducts => prevProducts.map(p => p._id === data._id ? data : p));
                setUpdateProduct({ id: '', name: '', image: '', tipology: '', price: '', year: ''}); // Reset form
            })
            .catch(err => {
                console.error('Errore nella richiesta della fetch', err);
            });
    };

    return(
        <>
        <div className='contenitorebackend'>
            <div className='contenutobackend'>
                <ul className='ulbackend'>
                    {product.map((prod) => (
                        <li key={prod._id}>
                            <h5>{prod.name}</h5>
                            <img className="imgprod" src={prod.image} alt={prod.name} style={{ maxWidth: '100px' }} />
                            <h5>{prod.tipology}</h5>
                            <h5>{prod.price}</h5>
                            <h5>{prod.year}</h5>
                        </li>
                    ))}
                </ul>
                <div className='inputbackend'>
                    <form onSubmit={addProducts}>
                        <input placeholder='inserisci nome' type='text' value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required/>
                        <input placeholder='inserisci immagine' type='text' value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} required/>
                        <input placeholder='inserisci tipo' type='text' value={newProduct.tipology} onChange={(e) => setNewProduct({...newProduct, tipology: e.target.value})} required/>
                        <input placeholder='inserisci prezzo' type='text' value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required/>
                        <input placeholder='inserisci anno' type='text' value={newProduct.year} onChange={(e) => setNewProduct({...newProduct, year: e.target.value})} required/>
                        <button type='submit'>Aggiungi prodotto</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
