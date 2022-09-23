import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../firebase'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgMenu};
  color: ${({ theme }) => theme.textMenu};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.hr};
  color: ${({ theme }) => theme.textMenu};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.hr};
  color: ${({ theme }) => theme.textMenu};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.hr};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

export default function Upload({ setOpen }) {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [image100, setImage100] = useState(0); // PORCENTAJE DE CARGA DE IMAGEN
  const [video100, setVideo100] = useState(0); // PORCENTAJE DE CARGA DE VIDEO
  const [input, setInput] = useState({});
  const [tags, setTags] = useState([]);
  
  const navigate = useNavigate()

  const handleText = (e) => {
    setTags(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const upload = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // unico filename para que no haya conflictos
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImage100(Math.round(progress))
          : setVideo100(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInput((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && upload(video, 'videoUrl');
  }, [video]);

  useEffect(() => {
    image && upload(image, 'imgUrl');
  }, [image]);


  const handleUpload = async (e) => {
    e.preventDefault()
    const res = await axios.post("/videos", {...input, tags})
    setOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)

  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload new video</Title>
        <Label>Video:</Label>
        {video100 > 0 ? (
            "Uploading... "  + video100 + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}{" "}
        {/* Solo videos se aceptan y al subir una sola file solo quiero la primera [0] */}
        <Input
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
        />
        <Description
          name="desc"
          placeholder="Description"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas"
          onChange={handleText}
        />
        <Label>Image</Label>
        {image100 ? (
          "Uploading... " + image100 + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}{" "}
        {/* Solo imagenes se aceptan */}
        <Button onClick={handleUpload}>Upload:</Button>
      </Wrapper>
    </Container>
  );
}
