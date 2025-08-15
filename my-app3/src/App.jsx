import { useState, useEffect } from 'react'
import Form from './Form';
import List from './List';

function App() {
  //The API URL to be passed into the useEffect hook.
  const API_URL = 'http://jsonplaceholder.typicode.com/';

  //These are states that change after render either by user actions or designed functions
  const [reqType, setReqType] = useState('users'); //This controls the request the user is asking for (posts,comments, users)
  const [items, setItems] = useState([]); //here we are controlling the field we get from the API putting them into an array


  // We create a useEffect hook to run on render and on reqType change to forward a new API everytime the reqType type is changed.
  useEffect(() => {
    // We create our annonymous async function to load our API Url to fetch the data from the API.

    const fetchItems = async () => {
      // We always keep our API fetch in a try | catch | finally block to catch the errors 
      try {
        const response = await fetch(`${API_URL}${reqType}`); // this is our new API_URL
        // console.log(`${API_URL}${reqType}`)
        // console.log(response);
        const data = await response.json(); // We convert the json text gotten from the API to JS object
        // console.log(data);
        if(!response.ok) {
          console.log('err')
        }
        setItems(data)
      } catch(err) {
        console.log(err);
        console.err(err);
      } finally {
        console.log("We good")
      }
    }

    fetchItems();
  }, [reqType]);

  return (
    <div className="App">

      <Form
        reqType={reqType}
        setReqType={setReqType}
       />
      <List
        items={items}
       />
      
    </div>
  )
}

export default App
