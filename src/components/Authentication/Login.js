import React, { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap' 
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

export const Login = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        setEmail(emailRef.current.value)
        setPassword(passwordRef.current.value)
        try {
            setError('')
            setLoading(true)
            await auth.signInWithEmailAndPassword(email, password).then(() =>{
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/');
            }).catch(err => setError(err.message));
        } catch {
            setError("Fail to sign in")
        }
        setLoading(false)
    }
    return (
        <>
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required/>
                        </Form.Group>
                        <br/>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='Password' ref={passwordRef} required/>
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} className='w100' type='submit'>Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            </div>
        </Container>
        </>
    )
}
