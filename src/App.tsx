// Components
import TimelineWrapper from "./components/TimelineWrapper";
import NewTimeline from "./components/NewTimeline";

const App = () => {
  return (
    <div className="app">
      <TimelineWrapper>
        <NewTimeline
          initialLayers={[
            {
              id: "main-layer",
              label: "Main Layer",
              open: true,
              children: [
                {
                  id: "main-one-layer",
                  label: "Main One Layer",
                  controls: ["select"],
                },
                {
                  id: "main-two-layer",
                  label: "Main Two Layer",
                  controls: ["select"],
                },
                {
                  id: "main-three-layer",
                  label: "Main Three Layer",
                  open: true,
                  children: [
                    {
                      id: "main-three-one-layer",
                      label: "Main Three One Layer",
                      controls: ["input"],
                    },
                    {
                      id: "main-three-two-layer",
                      label: "Main Three Two Layer",
                      controls: ["input", "color-picker"],
                    },
                  ],
                },
                {
                  id: "main-four-layer",
                  label: "Main Four Layer",
                  controls: ["input", "select"],
                },
                {
                  id: "main-five-layer",
                  label: "Main Five Layer",
                  controls: ["input", "select"],
                },
              ],
            },
          ]}
          initialNodes={[
            {
              id: "node-1",
              layer: "main-layer",
              position: 2.4,
            },
          ]}
        />
      </TimelineWrapper>
    </div>
  );
};

export default App;
