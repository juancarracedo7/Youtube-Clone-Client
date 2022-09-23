import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from 'timeago.js' // cambia el formato de la hora
import axios from "axios"

const Container = styled.div`
  width: ${(props) => (props.type !== "sm" && "360px")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => (props.type === "sm" ? "flex" : "")};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex:1;
`;

const ImageChannel = styled.img`
  width: 36px;
  height: 36px;
  background-color: #999;
  border-radius: 50%;
  display: ${(props) => (props.type === "sm" ? "none" : "")};;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type === "sm" ? "0px" : "16px")};
  gap: 12px;
  flex: 1;
`;

const Text = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textMenu};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 10px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

// le paso por props type para poder hacer cambios de estilos
export default function Card({ type, video }) {

  const [user, setUser] = useState({});
  // console.log('user',user);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`/users/${video.userId}`); // url dinamica depende el type
      setUser(response.data);
      // console.log('data',response.data)
    };
    getUser();
  }, [video.userId]);


  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ImageChannel type={type} src={user.img} />
          <Text>
            <Title>{video.title}</Title>
            <ChannelName>{user.name}</ChannelName>
            <Info>{video.views} • {format(video.createdAt)}</Info>
          </Text>
        </Details>
      </Container>
    </Link>
  );
}
