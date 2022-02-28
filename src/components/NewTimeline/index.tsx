import { useState } from "react";

// Components
import Sidebar from "./Sidebar";

//
import "./index.css";

const NewTimeline = () => {
  const [width, setWidth] = useState<number>(240);

  return (
    <div className="timeline">
      <Sidebar width={width} setWidth={setWidth}>
        <div className="tabs"></div>
      </Sidebar>
      <div className="main-timeline" style={{ left: width }}>
        asdsd
      </div>
    </div>
  );
};

export default NewTimeline;
