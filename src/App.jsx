import ButtonCmp from "./Button.jsx";

function App(){

  return (
    <>
      < ButtonCmp heading = "Get all Data" endpoint = "http://localhost:3000/players" action = "GET"/>
      < ButtonCmp heading = "Insert a Data" endpoint = "http://localhost:3000/players" action = "POST"/>
      < ButtonCmp heading = "Alter a Data by ID" endpoint = "http://localhost:3000/players" action = "PUT"/>
      < ButtonCmp heading = "Delete a player by id" endpoint = "http://localhost:3000/players" action = "DELETE"/>
    </>
  );
}

export default App;