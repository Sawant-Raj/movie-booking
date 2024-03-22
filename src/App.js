import React, { useRef, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalBooked, setTotalBooked] = useState(0);
  const [editedUser, setEditedUser] = useState(null);
  const nameInputRef = useRef();
  const seatInputRef = useRef();
  const [filteredSeat, setFilteredSeat] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSeat = seatInputRef.current.value;

    // Check if the entered seat is already occupied
    const isSeatOccupied = users.some((user) => user.seat === enteredSeat);
    if (isSeatOccupied) {
      alert("Seat is already booked.");
      return;
    }

    // Add the user if the seat is available
    if (enteredName.trim().length === 0 && enteredSeat.trim().length === 0) {
      alert("Please enter your name and seat number.");
      return;
    } else if (enteredName.trim().length === 0) {
      alert("Please enter your name.");
      return;
    } else if (enteredSeat.trim().length === 0) {
      alert("Please enter the seat number.");
      return;
    }

    setUsers((prevUsers) => [
      ...prevUsers,
      { id: Math.random().toString(), name: enteredName, seat: enteredSeat },
    ]);
    setTotalBooked((prevTotal) => prevTotal + 1);
    nameInputRef.current.value = "";
    seatInputRef.current.value = "";
  };

  const deleteHandler = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setTotalBooked((prevTotal) => prevTotal - 1);
  };

  const editHandler = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditedUser(userToEdit);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setTotalBooked((prevTotal) => prevTotal - 1); // Decrease total count
    nameInputRef.current.value = userToEdit.name;
    seatInputRef.current.value = userToEdit.seat;
  };

  const cancelEditHandler = () => {
    setEditedUser(null);
    nameInputRef.current.value = "";
    seatInputRef.current.value = "";
  };

  const filterHandler = (event) => {
    setFilteredSeat(event.target.value);
  };

  const filteredUsers = filteredSeat
    ? users.filter((user) => user.seat.includes(filteredSeat))
    : users;

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSeat = seatInputRef.current.value;

    if (editedUser) {
      // Editing existing user
      const updatedUsers = users.map((user) =>
        user.id === editedUser.id ? { ...user, name: enteredName, seat: enteredSeat } : user
      );
      setUsers(updatedUsers);
      setEditedUser(null);
    } else {
      // Adding new user
      addUserHandler(event);
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>Movie Booking</h1>
        <p>Total Booked: {totalBooked}</p>
        <label htmlFor="slot" style={{ marginRight: "10px" }}>
          Find Slot:
        </label>
        <input
          type="number"
          id="slot"
          value={filteredSeat}
          onChange={filterHandler}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={{ marginRight: "10px" }}>
          User Name:
        </label>
        <input type="text" id="name" ref={nameInputRef} />
        <label
          htmlFor="seat-number"
          style={{ marginRight: "10px", marginLeft: "20px" }}
        >
          Seat Number:
        </label>
        <input type="number" id="seat-number" ref={seatInputRef} />
        <button type="submit" style={{ marginLeft: "20px" }}>
          {editedUser ? "Update" : "Add"}
        </button>
        {editedUser && (
          <button type="button" onClick={cancelEditHandler} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      {filteredUsers.length === 0 ? (
        <h2 style={{ marginLeft: "20px" }}>Nothing Present</h2>
      ) : (
        <div>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                {editedUser && editedUser.id === user.id ? null : (
                  <>
                    {user.name} {user.seat}
                    <button
                      type="button"
                      onClick={() => editHandler(user.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHandler(user.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
