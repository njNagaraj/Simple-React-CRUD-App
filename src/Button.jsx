import { useState } from "react";

function ButtonCmp(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleClick = async () => {
    let response;
    try {
      if (props.action === "GET") {
        // Fetch all data
        response = await fetch(props.endpoint);
        const data = await response.json();
        console.log("Players: ", data);
      } else if (props.action === "POST") {
        // Insert new data
        response = await fetch(props.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age })
        });
        const result = await response.json();
        console.log("Inserted Player: ", result);
      } else if (props.action === "PUT") {
        // Update data by ID
        response = await fetch(`${props.endpoint}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age })
        });
        const result = await response.json();
        console.log("Updated Player: ", result);
      } else if (props.action === "DELETE") {
        // Delete data by ID
        response = await fetch(`${props.endpoint}/${id}`, {
          method: "DELETE"
        });
        const result = await response.json();
        console.log("Deleted Player: ", result);
      }

      // Log success if the response is OK
      if (response.ok) {
        console.log("Request successful");
      } else {
        console.log("Error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="btn">
      <h2>{props.heading}</h2>
      {props.action === "GET" && (
        <button onClick={handleClick}>Get All Players</button>
      )}

      {props.action === "POST" && (
        <>
          <input
            type="text"
            placeholder="Enter Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Player Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button onClick={handleClick}>Insert Player</button>
        </>
      )}

      {props.action === "DELETE" && (
        <>
          <input
            type="text"
            placeholder="Enter ID to Delete"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={handleClick}>Delete Player</button>
        </>
      )}

      {props.action === "PUT" && (
        <>
          <input
            type="text"
            placeholder="Enter ID to Update"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter New Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter New Player Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button onClick={handleClick}>Update Player</button>
        </>
      )}
    </div>
  );
}

export default ButtonCmp;
