import { StreamChat } from 'stream-chat'
import {URL, STREAM_API_KEY} from './exports';
const chatClient = StreamChat.getInstance(STREAM_API_KEY);

export const fetchuserToken = async (userID) => {
  let userToken = await fetch(`${URL}/stream-token`,
  {
   method: "post",
   headers: { "Content-Type" : "application/json"},
   body: JSON.stringify({
   input: String(userID)
  })
  }).then(response => response.json())
   .then(fetchuserToken => {
      return fetchuserToken;
  })
  .catch(error => console.warn(error));
  console.log("TOKEN"+userToken);
    return userToken;
}

export const setClient = async (id,fname,lname,image_url) => {
  // check if client is already connected, if it isn't enter block and connect client to
  // stream-chat
  const name = fname + ' ' + lname
  console.log('id: ', id, 'name: ', name, image_url);
    let response = await fetchuserToken(id)
    console.log('setclient check',response)
    if(response != null){
      chatClient.setUser(
        {
         id: String(id),
         name: name,
         image: image_url
        },
        response
        );
        console.log('user connected!')
    }
}
