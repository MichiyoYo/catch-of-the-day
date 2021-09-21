import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import PropTypes from "prop-types";
import fishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  /*initial state can be set in the constructor or using a 
  property like below*/
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  // start lifecycle methods
  componentDidMount() {
    //first reinstate the local storage
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  //to avoid memory leakes for mounting a ton of apps without unmounting them
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  //end lifecycle methods

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

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order: order });
  };

  updateFish = (key, updatedFish) => {
    //1. take copy of the current state
    const fishes = { ...this.state.fishes };
    //2. Update that state
    fishes[key] = updatedFish;
    //3. set that to state
    this.setState({ fishes: fishes });
  };

  deleteFish = (key) => {
    //1. copy state
    const fishes = { ...this.state.fishes };
    //2. remove item
    fishes[key] = null;
    //3. update state
    this.setState({ fishes: fishes });
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
