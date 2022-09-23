import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import Upload from "./Upload";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgMenu};
  position: sticky;
  top: 0;
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative; // para que el hijo Search pueda tener position absolute
`;
const Search = styled.div`
  position: absolute; // el padre tiene que tener position relativa
  width: 40%; // para prevenir que me ocupe toda la navbar
  right: 0;
  left: 0;
  margin: auto;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.textMenu};
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textMenu};
  width: 100%;
`;
const Button = styled.button`
  cursor: pointer;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  console.log(query)
  const navigate = useNavigate()
  const { actualUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search"  onChange={(e) => setQuery(e.target.value)}/>
            <SearchOutlinedIcon onClick={()=>navigate(`/search?title=${query}`)} style={{cursor : 'pointer'}}/>
          </Search>
          {actualUser ? (
            <User>
              <VideoCallOutlinedIcon
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <Button onClick={handleLogout}>
                <LogoutIcon /> Logout
              </Button>
              <Image src={actualUser.img} />
              {actualUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}
