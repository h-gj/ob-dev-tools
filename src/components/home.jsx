import React, {Fragment} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Timeline, Event } from "react-timeline-scribble";


function Home () {
    return (
      <div className='App'>
        <Fragment>
          <h2>更新日志</h2>
          <br></br>
          <Timeline>
            <Event interval={"2020/11/08"}>
              "解绑一切"中支持一次性解绑多个项目
            </Event>
          </Timeline>
      </Fragment>
      </div>
    );
  }

export default Home;
