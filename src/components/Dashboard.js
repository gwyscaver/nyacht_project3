import React from "react";
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

  const {allChats, sendChatAction, user} = React.useContext(CTX);

  console.log({allChats});

  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0])
  const [textValue, changeTextValue] = React.useState('')

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
                <ListItem onClick={event => changeActiveTopic(event.target.innerText) } key={topic} button>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
            {/* End of List Items */}
          </div>
            
            {/* Component to break 3 */}
          <div className={classes.chatWindow}>

            {
                allChats[activeTopic].map((chat, i) => (
            
               <div className={classes.flex} key={i}>
                   <Chip label={chat.from} variant="outlined" />
                    <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
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
            sendChatAction({from: user, msg: textValue, topic: activeTopic})
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
