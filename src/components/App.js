import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    fetch(" http://localhost:3001/pizzas")
    .then((r) => r.json())
    .then((e) => setPizzas(e))
  },[])
  console.log(pizzas)

  function handleSelectedPizza(pizza) {
    setSelectedPizza(pizza);
    console.log(selectedPizza)
  }

  function handleUpdatePizza(updatedPizza) {
    setPizzas((prevPizzas) =>
      prevPizzas.map((pizza) => (pizza.id === updatedPizza.id ? updatedPizza : pizza))
    );
    setSelectedPizza(null); // Reset form after update
  }
  
  return (
    <>
      <Header />
      <PizzaForm selectedPizza={selectedPizza} onUpdatedPizza={handleUpdatePizza}/>
      <PizzaList pizzas={pizzas} onSelectedPizza={handleSelectedPizza} />
    </>
  );
}

export default App;
