import React, { useState, useRef } from 'react'
import { storage, db } from '../../firebase'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap' 
import { Link, useNavigate } from 'react-router-dom'

export const AddProduct = () => {
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productImg, setProductImg] = useState(null)
    const [productDes, setProductDes] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const types =['image/jpg','image/jpeg','image/png','image/PNG'];

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)){
            setProductImg(selectedFile);
            setError('')
        } else{
            setProductImg(null)
            setError('Please select a valid image type png or jpeg')
        }
    }

    // add product submit function
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductDes: productDes,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductDes('');
                        setProductPrice(0)
                        setProductImg('');
                        document.getElementById('file').value = '';
                        setError('');
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">ADD PRODUCT</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={addProduct}>
                        <Form.Group controlId='product-name'>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type='text' required onChange={(e) =>setProductName(e.target.value)} value={productName} />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='product-price'>
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type='number' required onChange={(e) =>setProductPrice(e.target.value)} value={productPrice} />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='product-images'>
                            <Form.Label>Product Iamge</Form.Label>
                            <Form.Control type='file' multiple required onChange={productImgHandler} id='file'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="product-description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) =>setProductDes(e.target.value)} value={productDes} />
                        </Form.Group>
                        <br/>
                        <div className=' text-center mt-2'>
                            <Button disabled={loading} className='w-100' type='submit'>Add Product</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
            <Button disabled={loading} className='w100' type='submit'>Cancel</Button>
            </div>
            </div>
        </Container>
    )
}
