import React from "react";
import { Button, Form, Badge } from "react-bootstrap";

import axios from "axios";
import { toast } from "react-toastify";

class BatchCreateUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: "test",
      baseUrl: "https://test-api.duckdake.com",
      batchCreateNum: 0,
      createdUsers: [],
    };
    this.handleBatchCreateNumChange = this.handleBatchCreateNumChange.bind(
      this
    );
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

  handleBatchCreateNumChange(event) {
    this.setState({ batchCreateNum: event.target.value });
  }

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
    const batchCreateNum = this.state.batchCreateNum;
    console.log("batchCreateNum", batchCreateNum);

    const url = `${this.state.baseUrl}/api/client/bargain/tests/batch-create-user`;

    axios({
      method: "post",
      url,
      data: {
        num: batchCreateNum,
        pwd: "123456",
      },
    }).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("创建成功");
        console.log("创建的学号", res.data.data);
        let users = res.data.data;
        let user_ids = users.map((x) => x[0]);
        user_ids = user_ids.join(",");
        this.setState({ createdUsers: user_ids });
        let alreadyCreatedUsers = localStorage.getItem("createdUsers");
        if (alreadyCreatedUsers) {
          alreadyCreatedUsers = `${alreadyCreatedUsers},${user_ids}`;
          localStorage.setItem("createdUsers", alreadyCreatedUsers);
        } else {
          localStorage.setItem("createdUsers", user_ids);
        }
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
            <h2>批量注册（密码为123456）</h2>
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
            <Form.Label>注册数量</Form.Label>

            <Form.Control
              type="text"
              value={this.state.batchCreateNum}
              onChange={this.handleBatchCreateNumChange}
              placeholder="请输入注册数量"
              required
            ></Form.Control>
          </Form.Group>
          <br></br>

          <Button variant="warning" type="submit" size="lg" block>
            确定
          </Button>

          <br></br>
          <br></br>
          <Form.Group>
            <Form.Label>
              <Badge pill variant="success">
                注册成功学号
              </Badge>
              <br />
              <Badge variant="success">{this.state.createdUsers}</Badge>
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <Badge pill variant="info">
                最近注册用户
              </Badge>
              <br />
              <Badge variant="info">
                {localStorage.getItem("createdUsers")}
              </Badge>
            </Form.Label>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default BatchCreateUsers;
