// Components
import Timeline from "./components/Timeline";

const App = () => {
  return (
    <div className="app">
      <Timeline
        duration={30}
        initialZoom={1}
        zoomSpeed={0.2}
        panSpeed={1.4}
        initialNodes={[
          {
            id: "node-1",
            position: 3,
            layer: "one-layer",
          },
          {
            id: "node-2",
            position: 6,
            layer: "two-one-layer",
          },
        ]}
        initialLayers={[
          {
            id: "one-layer",
          },
          {
            id: "two-layer",
            childrens: [
              {
                id: "two-one-layer",
              },
              {
                id: "two-two-layer",
              },
            ],
            open: true,
          },
        ]}
      />
    </div>
  );
};

export default App;
