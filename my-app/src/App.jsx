import { useState } from 'react';

import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One pound of fufu"
    },
    {
      id: 2,
      checked: false,
      item: "twelve dose of Amala"
    },
    {
      id: 3,
      checked: false,
      item: "3 Wraps of Eba"
    }
  ]);

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    localStorage.setItem('shoppingList', JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppingList', JSON.stringify(listItems));
  }


  return (
    <div className="App">

      <Header />
      <AddItem />
      <Content
        items={items}
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
