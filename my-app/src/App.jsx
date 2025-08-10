import { useState, useTransition } from 'react'; //React hooks to manaage 
import { useEffect } from 'react';


//When importing in react we dont use the normal path directory for images and SVG'S
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';

function App() {
  //The state accepts the default value inside of its brackets as a parameter. can either be empty or defined
  // We are setting the items STATE to a default value to the localStorage creating an empty list for a new user or the stored value in the shopping list for an existing user. this was with localStorage
  //We never change the state of an item directl only with the setter function given by the state "setState"
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //We use this to return true imediately to control the loading status of the items and immediately the fetchItems is done returning we change it back to false

  const API_URL = 'http://localhost:3000/items'


  //Useefect loads immediately the page or component is rendered then it updates on change of the dependency array []. We mostly use it for loading API'S from servers
  useEffect(() => {

    //We define an asynchronous function here to get the data from the API on load. that is when the page is rendered
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error("Did not recieve expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }

    //We call the asynchronous function here
    //We can pass it in a setTimeout function since most times the API might not have loaded before the page finishes rendering
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, [])


  //We can declare functions in the components before we use them in the component to be returned
  //These functions are then passed where needed to be called either on event change
  const addItem = async (item) => {
    //We are updating our state here. the items state. adding items to the state
    const id = String(items.length ? Number(items[items.length - 1].id) + 1 : 1);
    const myNewItem = { id, checked: false, item};
    const listItems = [...items, myNewItem]
    setItems(listItems); //The setItems update the state directly.

    //Now we want to be in sync with our API updating the API too. by using the post request to send to the API
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' //The type of data we are sending
      },
      //We are only posting the newItem not the listItems list.
      body: JSON.stringify(myNewItem) //here we are converting the object we are passing to the API to a json-formatted string.
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    //now we want to update the check option in the API too. 
    //We get the current item that has been checked by filtering through the list and getting the item of the ID passed into the handleCheck
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    //here we create a new list that isnt the same as the ID passed. listItems is now modified to filter away item.id that is equal to the ID passed
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    //The event.preventDefault only works to stop the page from loading on event submit to stop the page/component  from re-rendering on every input change
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }


  return (
    <div className="App">

      {/* This is how we add components to the parent component/app  */}
      <Header />
      <AddItem
        // this is how to pass PROPS to the child component down from the parent component //Props are properties needed by the child components or sibling components but declared in the parents component
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {/* if isLoading is true display this */}
        {isLoading && <p>Loading Items.....</p>} 
        {fetchError && <p style={{color: 'red'}}>{` ${fetchError}`}</p>}

        {!fetchError && !isLoading &&
        
        <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        }
      </main>
      <Footer
        length={items.length}
      />
    </div>
  )
}

export default App
