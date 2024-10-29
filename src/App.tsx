import Room from "./components/Room";


function App() {
  const token = import.meta.env.VITE_MEET_TOKEN // Replace with your actual token
  return (
    <>
      <Room token={token}/>
    </>
  );
}

export default App;
