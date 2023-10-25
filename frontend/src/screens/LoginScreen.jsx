import { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlices'
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { FaTimes } from 'react-icons/fa';
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const  {userInfo}=useSelector( (state)=>state.auth )

    useEffect(() => {
        if (userInfo){
            navigate ('/')
        }
    }, [navigate, userInfo])
    
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
     
            dispatch(setCredentials({ ...res }))
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message||err.error)
        }     
    }
    return (
        <FormContainer >
            <div className='d-flex justify-content-end' >
                <FaTimes size={24} className="iconStyle" onClick={e=> {navigate("/")}} />
</div>
            <h1>Sign in</h1>

            <Form onSubmit={submitHandler} >
                <FormGroup className='my-2' controlId='email'>

                    <FormLabel> Email Address</FormLabel>
                    <FormControl type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </FormControl>
                </FormGroup>

                <FormGroup className='my-2' controlId='password'>

                    <FormLabel> Email Password</FormLabel>
                    <FormControl type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </FormControl>
                    {isLoading &&<Loader/>}
                </FormGroup>

                <Button type='submit' variant='primary' className="mt-3">
                    Sign in
                </Button>

                <Row className='py-3' >
                    <Col >                
                        New Customer ? <Link to='/register'> Register</Link>
                    
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )


}
export default LoginScreen




