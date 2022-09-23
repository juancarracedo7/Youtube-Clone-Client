import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Home({type}) {
  const [videos, setVideos] = useState([]);
  // console.log('videos',videos);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(`/videos/${type}`); // url dinamica depende el type
      setVideos(response.data);
      //console.log('data',response.data)
    };
    getVideos();
  }, [type]);
  return (
    <Container>
      {videos &&
        videos.map((video, index) => {
          return <Card key={index} video={video} />;
        })}
    </Container>
  );
}
