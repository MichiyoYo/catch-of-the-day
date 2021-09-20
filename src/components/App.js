import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import fishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  /*initial state can be set in the constructor or using a 
  property like below*/
  state = {
    fishes: {},
    order: {},
  };

  addFish = (fish) => {
    //to update state:
    //1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //2. add new fish to that fishes variable by using a unique value like date
    fishes[`fish${Date.now()}`] = fish;
    //3. set the new fishes object to state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: fishes });
  };

  addToOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };
    //2. add to the order or update the number in the order
    order[key] = order[key] + 1 || 1;
    //3. call setState to update the state
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
