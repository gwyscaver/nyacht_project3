import React from 'react';
import io from 'socket.io-client'


export const CTX = React.createContext();


// chat will come in like
//from: 'user'
//msg: 'hi'
//topic: 'general'

const initState = {
    general: [
        {from: 'john', msg:'this is rough'},
        {from: 'john', msg:'really rough'},
    ],
    topic2: [
        {from: 'john', msg:'this is rough'},
        {from: 'john', msg:'really rough'},

    ]
}

const reducer = (state, action) => {

    //destruct to make more clean 
    const {from, msg, topic} = action.payload;
    switch(action.type){
        case 'RECEIVE_MESSAGE':
        return {
            //bring in our entire state
            ...state,
            //then pull the specific topic 
            [topic]: 
            [
                //then bring forward all old messages in the topic
            ...state[topic], {from, msg}
            ]
        }
        default:
            return state
    }
}

let socket;

function sendChatAction(value){
    socket.emit("chat message", value)
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if(!socket) {
        socket = io(':3002')
        socket.on('chat message', function(msg){
            console.log("Message test ", msg)
           dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
    })
}

//temporary
const user = 'John' + Math.random(100).toFixed(2);




    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}