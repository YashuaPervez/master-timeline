// Components
import TimelineWrapper from "./components/TimelineWrapper";
import NewTimeline from "./components/NewTimeline";

const App = () => {
  return (
    <div className="app">
      <TimelineWrapper>
        <NewTimeline />
        {/* <Timeline
          duration={100}
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
            {
              id: "three-layer",
            },
            {
              id: "four-layer",
            },
            {
              id: "five-layer",
            },
          ]}
        /> */}
      </TimelineWrapper>
    </div>
  );
};

export default App;
