import React, {useState, useEffect} from "react";
//for general style of MaterialUI
import { makeStyles } from "@material-ui/core/styles";
//for paper items--
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//

//for list items--
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//

//for user icon in chat window--
import Chip from '@material-ui/core/Chip';
//

//for buttons---
import Button from '@material-ui/core/Button';
//

//for textFeild--
import TextField from '@material-ui/core/TextField';
//

import {CTX} from './Store';




//where we can assign css values
const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

export default function Dashboard() {

  const classes = useStyles();

  const {allChats, sendChatAction, enterChatRoomAction, user} = React.useContext(CTX);

  console.log({allChats});

  //pulls off all of the keys from the all chats Object
  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0])

  const [textValue, changeTextValue] = React.useState('')
  
  const [messages, setMessage]= useState([])

  useEffect(() =>{
    enterChatRoomAction(activeTopic)
  },[activeTopic])

  const handleSelecTopic = (topic)=>{
    changeActiveTopic(topic)
    // enterChatRoomAction(topic)
    //make request to get topic-specific message
    // use setMessage to update message state
    // map over messages 
  }
  return (
    <div>
        {/* Component to break 1 */}
      <Paper className={classes.root}>

        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        {/* Componenet to break 2 */}
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            {/* List Items */}
            <List>
              {topics.map(topic => (
                // on click of a list item ie a topic grab the inner text of this list item and set it as the active topic 
                <ListItem onClick={event => handleSelecTopic(event.target.innerText) } key={topic} button>
                  {/* change active topic to handleSelectTopic */}
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
            {/* End of List Items */}
          </div>
            
            {/* Component to break 3 */}
          <div className={classes.chatWindow}>

            {
              //grab our all chats object with the value of our active topic 
                allChats[activeTopic].map((chat, i) => (
                  //map over each chat
               <div className={classes.flex} key={i}>
                 {/* display who its from */}
                   <Chip label={chat.user} variant="outlined" />
                   {/* Display the message */}
                    <Typography variant='body1' gutterBottom>{chat.message}</Typography>
               </div>
            
            ))
            }
          </div>
        </div>
        {/* Componenet to break 4 */}
        <div className={classes.flex}>
        <div>
        <TextField
          id="outlined-basic"
          className={classes.chatBox}
          label="Send a message!"
          margin="normal"
          variant="outlined"
          value={textValue}
          onChange={ event => changeTextValue(event.target.value)}
        />
      </div>

        <Button 

        variant="contained" 
        color="primary" 
        className={classes.button}
        onClick={() => {
          //this is where we are sending out data, this is how the object will look
            sendChatAction({user, message: textValue, topic: activeTopic})
            changeTextValue('');
        }
            }
        >
                Send
        </Button>
            </div>

      </Paper>
    </div>
  );
}
