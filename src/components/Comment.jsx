import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {format} from 'timeago.js' // cambia el formato de la hora

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.textMenu};
`;

const Username = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

export default function Comment({comment}) {


  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/${comment.userId}`);
      setUser(res.data)
    };
    fetchComment();
  }, [comment.userId]);


  return (
    <Container>
      <Image src={user.img} />
      <Details>
        <Username>
          {user.name}<Date>{format(comment.createdAt)}</Date>
        </Username>
        <Text>
         {comment.desc}
        </Text>
      </Details>
    </Container>
  );
}
