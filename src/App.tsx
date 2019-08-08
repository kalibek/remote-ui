import React, { Component, TouchEvent } from 'react';
import './App.css';

interface AppState {
  x: number;
  y: number;
  fullScreen: boolean;
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      x: 0, y: 0, fullScreen: false,
    }
  }

  touchStart = (event: TouchEvent) => {
    if (event.touches && event.touches.length) {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      this.setState(prev => ({ ...prev, x, y }));
    }
  };

  touchEnd = (event: TouchEvent) => {
    if (event.changedTouches && event.changedTouches.length) {
      const x = event.changedTouches[0].clientX;
      const y = event.changedTouches[0].clientY;
      this.sendMouseMove(x - this.state.x, y - this.state.y)
    }
  };

  sendMouseMove = (x: number, y: number) => {
    fetch("/api/mouse", {
      method: "POST",
      body: JSON.stringify({
        x: Math.round(x),
        y: Math.round(y)
      })
    }).then(r => {
      this.setState(prev => ({ ...prev, start: { x: 0, y: 0 } }));
    });
  };

  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <div className="Mouse Header">
            keyboard
          </div>
          <div className="Keyboard Header">
            mouse
          </div>
          <div className="Touchpad"
               onTouchStart={this.touchStart}
               onTouchMove={this.touchEnd}
               onTouchEnd={this.touchEnd}
          />
          <div className="Scollbar"/>
          <div className="Left"/>
          <div className="Right"/>
        </div>
      </div>
    );
  }

}

export default App;
