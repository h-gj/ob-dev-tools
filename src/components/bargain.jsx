import React from "react";
import { Button, Form, Badge } from "react-bootstrap";

import axios from "axios";
import { toast } from "react-toastify";

class Bargain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: "test",
      baseUrl: "https://test-api.duckdake.com",
      bargainHelpers: null,
      createdUsers: [],
      toPoint: 100,
      bargainStartLog: null,
      knifeCount: 10,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
  }

  handleEnv(event) {
    const env = event.target.value;
    var baseUrl = "";
    console.log("Selected env:", env);
    if (env === "dev") {
      baseUrl = "https://api-dev.bitorange.cn";
    } else if (env === "test") {
      baseUrl = "https://test-api.duckdake.com";
    } else {
      baseUrl = "http://localhost:8000";
    }
    this.setState({ env: env, baseUrl: baseUrl });
  }

  handleBargainHelpersChange = (event) =>
    this.setState({ bargainHelpers: event.target.value });

  handleToPointChange = (event) =>
    this.setState({ toPoint: event.target.value });

  handleBargainStartLogChange = (event) =>
    this.setState({ bargainStartLog: event.target.value });

  handleKnifeCountChange = (event) =>
    this.setState({ knifeCount: event.target.value });

  popUpToast(value) {
    toast.warn(value, {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let bargainHelpers = this.state.bargainHelpers;
    const bargainStartLog = this.state.bargainStartLog;
    const toPoint = this.state.toPoint;
    const knifeCount = this.state.knifeCount;
    console.log("bargainHelpers", bargainHelpers);
    console.log("bargainStartLog", bargainStartLog);
    console.log("toPoint", toPoint);
    console.log("knifeCount", knifeCount);

    if (bargainHelpers) {
      bargainHelpers = bargainHelpers.split(",");
    }

    const url = `${this.state.baseUrl}/api/client/bargain/tests/bargain-to-free`;

    axios({
      method: "post",
      url,
      data: {
        bargain_start_log: bargainStartLog,
        to_point_percent: toPoint,
        bargain_users: bargainHelpers,
        bargain_count: knifeCount,
      },
    }).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("砍价成功");
      } else {
        this.popUpToast(res.data.message);
      }
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="App">
          <Form.Group>
            <h2>批量砍价</h2>
            <hr />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput4">
            <Form.Label>请选择环境</Form.Label>
            <Form.Control
              as="select"
              value={this.state.env}
              onChange={this.handleEnv}
            >
              <option value="test">测试服</option>
              <option value="dev">开发服</option>
              <option value="local">本地</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>帮砍人</Form.Label>

            <Form.Control
              type="text"
              value={this.state.bargainHelpers}
              onChange={this.handleBargainHelpersChange}
              placeholder="多个学号以英文逗号分隔，若不填后台随机拿老用户砍价"
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>砍价发起记录</Form.Label>

            <Form.Control
              type="text"
              value={this.state.bargainStartLog}
              onChange={this.handleBargainStartLogChange}
              placeholder="砍价发起记录id（bargain_start_log）"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>砍到节点</Form.Label>

            <Form.Control
              type="text"
              value={this.state.toPoint}
              onChange={this.handleToPointChange}
              placeholder="砍到的节点，如砍到免费则填写100"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>砍的刀数</Form.Label>

            <Form.Control
              type="text"
              value={this.state.knifeCount}
              onChange={this.handleKnifeCountChange}
              placeholder="要砍几刀砍到节点"
            ></Form.Control>
          </Form.Group>
          <br></br>

          <Button variant="warning" type="submit" size="lg" block>
            确定
          </Button>
        </Form>
      </div>
    );
  }
}

export default Bargain;
