import { Navbar, Nav, Container, NavbarBrand, NavbarToggle, NavbarCollapse, NavLink, NavDropdown, Badge } from "react-bootstrap";

import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlices'
import {useNavigate} from 'react-router-dom'
const Header = () => {
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const logoutHandler =  async ()=>{
        try {
            //  this function call will clear the cookie
            await logoutApiCall().unwrap();
            // this funcion call will clear the local storage
            dispatch(logout())
            navigate('/')

        } catch(error) {
            console.log(error)
        }
    }

    const { userInfo } = useSelector((state) => state.auth)
    return (
        <header>

            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>


                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand > App </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (<>

                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>
                            </>) : (<>

                                <LinkContainer to="/login">

                                    <NavLink >
                                        <FaSignInAlt />  Sign in

                                    </NavLink>
                                </LinkContainer>

                                <LinkContainer to="/register">
                                    <NavLink >
                                        <FaSignOutAlt />  Sign Up

                                    </NavLink>

                                </LinkContainer>

                            </>)}


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header