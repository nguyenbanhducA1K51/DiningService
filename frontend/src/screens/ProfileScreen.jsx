
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useUpdateMutation} from '../slices/userApiSlice'
import { ToastContainer, toast } from "react-toastify"
import Loader from "../components/Loader"
import { setCredentials } from '../slices/authSlices'
const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ update,{isUpdate}]=useUpdateMutation()
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)

        }
    }, [userInfo.name,userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Password does not match")
        }
        else {

            try {
                const res = await update({name,email,password}).unwrap()
                dispatch (setcredentials({...res}))
                toast.success("update success")
            } catch (error) {
                toast.error(err?.data?.message || err.error)
            }
        }

    }
    return (
        <FormContainer >
            <h1>Update</h1>

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
                    Update
                </Button>
        
            </Form>
        </FormContainer>
    )


}
export default ProfileScreen 