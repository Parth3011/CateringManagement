import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const { selectedItems: initialSelectedItems = [], selectedEvent, numberOfPeople , caterer_id } = location.state || {};
  console.log(caterer_id);

  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [event, setEvent] = useState(selectedEvent);
  const [peopleCount, setPeopleCount] = useState(numberOfPeople);

console.log(selectedItems);
  // Fetch selectedItems from URL query parameters on initial load
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const storedItems = queryParams.get("selectedItems");
    if (storedItems) {
      setSelectedItems(JSON.parse(decodeURIComponent(storedItems)));
    }
    const storedEvent = queryParams.get("selectedEvent");
    if (storedEvent) {
      setEvent(storedEvent);
    }
    const storedPeopleCount = queryParams.get("numberOfPeople");
    if (storedPeopleCount) {
      setPeopleCount(parseInt(storedPeopleCount));
    }
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
    updateQueryParams(updatedItems, event, peopleCount); // Update URL query parameters
  };

  // Function to update the URL query parameters with the updated items
  const updateQueryParams = (items, event, peopleCount) => {
    const queryParams = new URLSearchParams();
    queryParams.set("selectedItems", encodeURIComponent(JSON.stringify(items)));
    queryParams.set("selectedEvent", event);
    queryParams.set("numberOfPeople", peopleCount.toString());
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams.toString()}`);
  };

  // Calculate total price for each item
  const calculateItemTotalPrice = (item) => {
    return parseFloat(item.price) * peopleCount;
  };

  // Calculate total price of selected items
  const totalPrice = selectedItems.reduce((total, item) => total + calculateItemTotalPrice(item), 0);

  // Function to navigate to checkout
  const goToCheckout = () => {
    if (selectedItems.length > 0) {
      // If there are selected items, navigate to checkout with the required state
      const queryParams = new URLSearchParams();
      queryParams.set("items", encodeURIComponent(JSON.stringify(selectedItems)));
      queryParams.set("totalPrice", totalPrice.toString());
      queryParams.set("numberOfPeople", peopleCount.toString());
      queryParams.set("event", event);
      queryParams.set("caterer_id", caterer_id);
      window.location.href = `/customer/checkout?${queryParams.toString()}`;
    } else {
      // If there are no selected items, display a message
      alert("Please go back and select items before proceeding to checkout.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", borderBottom: "2px solid #333", paddingBottom: "10px" }}>Your Cart</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {selectedItems.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{item.foodname}</p>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              Price per person: ₹{item.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              Total Price (for {peopleCount} people): ₹
              {calculateItemTotalPrice(item).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
            <button onClick={() => removeFromCart(index)} style={{ background: "red", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Remove from Cart</button>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold",marginBottom:"30px" }}>Total Price: ₹{totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
      {selectedItems.length > 0 && (
        <button onClick={goToCheckout} style={{ background: "blue", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px", marginBottom: "20px" }}>Go to Checkout</button>
      )}
    </div>
  );
};

export default CartPage;
