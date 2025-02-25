import React, { useEffect, useState } from "react";

function PizzaForm({selectedPizza,onUpdatedPizza}) {

  const [editTopping, setEditTopping] = useState({
    id: "",
    topping: "",
    size: "Small",
    vegetarian: false,
  });

  useEffect (() => {
    if (selectedPizza) {
      setEditTopping(selectedPizza)
    
    }
  },[selectedPizza])

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setEditTopping((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3001/pizzas/${editTopping.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(editTopping),
    })
    .then((r) => r.json())
    .then((updatePizza) => onUpdatedPizza(updatePizza));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={editTopping.topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
