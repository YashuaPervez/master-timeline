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
                  controls: {
                    select: true,
                  },
                },
                {
                  id: "main-two-layer",
                  label: "Main Two Layer",
                  controls: {
                    select: true,
                  },
                },
                {
                  id: "main-three-layer",
                  label: "Main Three Layer",
                  open: true,
                  children: [
                    {
                      id: "main-three-one-layer",
                      label: "Main Three One Layer",
                      controls: {
                        input: true,
                      },
                    },
                    {
                      id: "main-three-two-layer",
                      label: "Main Three Two Layer",
                      controls: {
                        input: true,
                      },
                    },
                  ],
                },
                {
                  id: "main-four-layer",
                  label: "Main Four Layer",
                  controls: {
                    input: true,
                    select: true,
                  },
                },
                {
                  id: "main-five-layer",
                  label: "Main Five Layer",
                  controls: {
                    input: true,
                    select: true,
                  },
                },
              ],
            },
          ]}
        />
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
