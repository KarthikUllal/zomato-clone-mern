export default function Cart({ cart}) {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {Object.keys(cart).length === 0 && <p>Cart is empty</p>}

      {Object.entries(cart).map(([id, quantity]) => (
        <div key={id}>
          <p>Dish ID: {id}</p>
          <p>Quantity: {quantity}</p>
        </div>
      ))}
    </div>
  );
}
