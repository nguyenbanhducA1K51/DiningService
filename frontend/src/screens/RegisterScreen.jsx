
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer,toast } from "react-toastify"
import Loader from "../components/Loader"
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlices'
const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name,setName]=useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('')
    const [register,{isLoading}] =useRegisterMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch=useDispatch()
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    },[navigate, userInfo])
    
    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
             toast.error("Password does not match")
        }
        else {
            try {
                const res =await register ({name,email,password}).unwrap()

                
                dispatch(setCredentials({ ...res }))
                navigate('/')

                toast.success("success!")
        
            } catch (err) {
    
                toast.error(err?.data?.message ||err.error)
            }
        }

    }
    return (
        <FormContainer >
            <h1>Sign up</h1>

            <Form onSubmit={submitHandler} >

                <FormGroup className='my-2' controlId='name'>

                    <FormLabel> Name</FormLabel>
                    <FormControl
                        type="text"
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>

                    </FormControl>
                </FormGroup>

                <FormGroup className='my-2' controlId='email'>

                    <FormLabel> Email Address</FormLabel>
                    <FormControl type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </FormControl>
                </FormGroup>

                <FormGroup className='my-2' controlId='password'>

                    <FormLabel> Password</FormLabel>
                    <FormControl type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </FormControl>
                </FormGroup>

                <FormGroup className='my-2' controlId='confirmPassword'>

                    <FormLabel> confirm Password</FormLabel>
                    <FormControl type="password"
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>

                    </FormControl>
                </FormGroup>
                <Button type='submit' variant='primary' className="mt-3">
                    Sign in
                </Button>
               

                <Row className='py-3' >
                    <Col >
                        Already has account <Link to='/login'> Login</Link>

                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )


}
export default RegisterScreen