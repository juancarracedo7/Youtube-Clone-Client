/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { videoSuccess, like, dislike } from "../redux/videoSlice";
import { format } from "timeago.js"; // cambia el formato de la hora
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.textMenu};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.textMenu};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.hr};
  margin: 15px 0;
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const SubscribeButton = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textMenu};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 15px;
`;

const Description = styled.p`
  font-size: 17px;
`;

const Videos = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`

export default function Video() {
  const { actualUser } = useSelector((state) => state.user);
  console.log("user", actualUser);
  const { actualVideo } = useSelector((state) => state.video);
  console.log("video", actualVideo);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  // console.log('path',path)

  const [channel, setChannel] = useState({});
  console.log("channel", channel);

  useEffect(() => {
    const data = async () => {
      try {
        const getVideo = await axios.get(`/videos/${path}`);
        console.log("getvideo", getVideo.data);
        const getChannel = await axios.get(`/users/${getVideo.data.userId}`);
        console.log("getchannel", getChannel.data);

        setChannel(getChannel.data);
        dispatch(videoSuccess(getVideo.data));
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`http://localhost:3001/users/like/${path}`);
    dispatch(like(actualUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`http://localhost:3001/users/dislike/${path}`);
    dispatch(dislike(actualUser._id));
  };

  const handleSubs = async () => {
    actualUser.subscribedUsers.includes(channel._id) // si ya esta subscripto
      ? await axios.put(`/users/unsub/${channel._id}`) // se puede desubscribir
      : await axios.put(`/users/sub/${channel._id}`); // si no esta subscripto se puede subscribir
    dispatch(subscription(channel._id));
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <Videos src={actualVideo.videoUrl} controls autoPlay></Videos>
        </VideoWrapper>
        <Title>{actualVideo?.title}</Title>
        <Details>
          <Info>
            {actualVideo?.views} views . {format(actualVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {actualVideo.like?.includes(actualUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {actualVideo.like?.length}
            </Button>
            <Button onClick={handleDislike}>
              {actualVideo.dislike?.includes(actualUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.image}></Image>
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{actualVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <SubscribeButton onClick={handleSubs}>SUBSCRIBE</SubscribeButton>
        </Channel>
        <Hr />
        <Comments videoId={actualVideo._id}/>
      </Content>
      <Recommendation tags={actualVideo.tags} />
    </Container>
  );
}
