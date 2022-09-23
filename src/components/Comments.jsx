import React,{ useState, useEffect} from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Container = styled.div`

`

const NewComment = styled.div`
display: flex;
align-items: center;
gap: 10px;
`

const Image = styled.img`
 width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Input = styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.textSoft};
width: 100%;
outline: none;
background-color: transparent;
padding: 5px;
`

export default function Comments({videoId}) {

  const { actualUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);





  return (
    <Container>
        <NewComment>
            <Image src={actualUser.img}/>
            <Input placeholder='Add a comment...' style={{color:"grey"}}/>
        </NewComment>
        {comments.map(c=>(
        <Comment key={c._id} comment={c}/>
      ))}
    </Container>
  )
}
