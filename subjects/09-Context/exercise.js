////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const MyContext = React.createContext();

class Form extends React.Component {
  render() {
    return (
      <div>
        <MyContext.Provider value={{ submit: this.props.onSubmit }}>
          {this.props.children}
        </MyContext.Provider>
      </div>
    );
  }
}

class SubmitButton extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Fragment>
            <button onClick={context.submit}>
              {this.props.children}
            </button>
          </Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <input
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            onKeyDown={e => {
              if (e.key === "Enter") context.submit();
            }}
          />
        )}
      </MyContext.Consumer>
    );
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert("YOU WIN!");
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

const fishes = ["tuna", "albacore"];

const fishy = fishes.map(fish => `${fish} + nice`);
console.log(fishy);

const fishes = ["tuna", "albacore"];
const fishyNotNice = fishes.map(fish => {
  if (fish == "tuna") {
    return fish;
  }
});

const fishes = ["tuna", "albacore"];
const smellyFish = fishes.map(fish => {
  if (fish === "tuna") {
    return "smelly";
  } else {
    return "Not Smelly ";
  }
});

console.log(smellyFish);
