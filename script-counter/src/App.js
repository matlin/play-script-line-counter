import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: {},
      title: "",
      url: ""
    };
  }

  componentDidMount() {
    this.analyze("http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml");
  }

  async getAnalysis(url) {
    return fetch("/api/analyze/" + encodeURIComponent(url)).then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    });
  }

  analyze(url) {
    this.getAnalysis(url).then(data => {
      this.setState({ characters: data.characters, title: data.title });
    });
  }

  updateUrl(event) {
    this.setState({ url: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Play Line Counter</h1>
        <p>
          Enter an xml script from{" "}
          <a href="http://www.ibiblio.org/xml/examples/shakespeare/">
            The Complete Work of Shakespeare
          </a>{" "}
          and you can see the number of lines each character had.
        </p>
        <span>
          <input
            type="text"
            placehoder="http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml"
            onChange={this.updateUrl.bind(this)}
            value={this.state.url}
          />
          <button
            onClick={() => {
              this.analyze(this.state.url);
            }}
          >
            Analyze
          </button>
        </span>
        <div>
          <h3>{this.state.title}</h3>
          <CharacterTable characters={this.state.characters} />
        </div>
      </div>
    );
  }
}

function CharacterTable(props) {
  if (Object.keys(props.characters).length === 0) return null;
  return (
    <table>
      <tr><th>Character</th><th># Lines</th></tr>
      {Object.keys(props.characters).map(character =>
        <tr><td>{character}</td><td>{props.characters[character]}</td></tr>
      )}
    </table>
  );
}

export default App;
