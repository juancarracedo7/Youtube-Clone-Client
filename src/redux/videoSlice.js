import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    actualVideo:null,
    loading:false,
    error:false
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers:{
        videoStart: (state) => {
            state.loading = true
        },
        videoSuccess: (state, action) => {
            state.loading = false;
            state.actualVideo = action.payload
        },
        videoFailed: (state) => {
            state.loading = false;
            state.error = true
        },
        like:(state,action)=>{
            // si no le puse like al video(si no esta mi id)
            if(!state.actualVideo.like.includes(action.payload)){
                state.actualVideo.like.push(action.payload) // le pongo like(agrego mi id)
                state.actualVideo.dislike.splice(state.actualVideo.dislike.findIndex((id) => {
                  return  id === action.payload
                }),1) // saco mi id de dislike
            }
        },
        dislike:(state,action)=>{
            // si no le puse dislike al video(si no esta mi id)
            if(!state.actualVideo.dislike.includes(action.payload)){
                state.actualVideo.dislike.push(action.payload) // le pongo dislike(agrego mi id)
                state.actualVideo.like.splice(state.actualVideo.like.findIndex((id) => {
                  return  id === action.payload
                }),1) // saco mi id de like
            }
        }
        
    }
  })

  export const {videoStart,videoSuccess,videoFailed, like, dislike} = videoSlice.actions

  export default videoSlice.reducer