import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

function App() {
  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <h1>React with Bootstrap and TypeScript</h1>
          <p>I'm not saying Hello World here</p>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
