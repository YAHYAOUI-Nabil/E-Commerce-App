import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';

import { mobile } from "../responsive"
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
    
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    align-items: center;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;
const Logo = styled.span`
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 3px;
    ${mobile({ fontSize: "24px" })};
    color: black;
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{color: "gray", fontSize: 16, cursor: "pointer"}} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to='/' style={{textDecoration : "unset"}}>
            <Logo>Bazar.</Logo>
          </Link>
        </Center>
        <Right>
          <Link to='/register'>
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to='/login'>
            <MenuItem>Sign In</MenuItem>
          </Link>
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar