import { useState } from 'react'; //React hooks to manaage 
import { useEffect } from 'react';


//When importing in react we dont use the normal path directory for images and SVG'S
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';

function App() {
  //The state accepts the default value inside of its brackets as a parameter. can either be empty or defined
  // We are setting the items STATE to a default value to the localStorage creating an empty list for a new user or the stored value in the shopping list for an existing user.
  //We never change the state of an item directl only with the setter function given by the state "setState"
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []); //short circuting the expected list
  const [newItem, setNewItem] = useState("")
  const [search, setSearch] = useState("")


  //Useefect loads immediately the page or component is rendered then it updates on change of the dependency array []. We mostly use it for loading API'S from servers
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items])


  //We can declare functions in the components before we use them in the component to be returned
  //These functions are then passed where needed to be called either on event change
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item};
    const listItems = [...items, myNewItem]
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
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
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        length={items.length}
      />
    </div>
  )
}

export default App
