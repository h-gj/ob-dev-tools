import React from "react";
import { Button, Form, Badge } from "react-bootstrap";

import axios from "axios";
import { toast } from "react-toastify";

class Bargain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: "local",
      baseUrl: "http://localhost:8000",
      createdUsers: [],
      toPoint: 1.0,
      bargainStartLog: null,
      knifeCount: 10,
      onGoingBargains: [],
      SNO: null,
      password: "",
      bargainDetailInfos: [],
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
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  handleOnGoingBargainsChange = (event) =>
    this.setState({ bargainStartLog: event.target.value });

  handleSnoChange = (event) => this.setState({ SNO: event.target.value });

  handlePasswordChange = (event) =>
    this.setState({ password: event.target.value });

  handleSubmit(event) {
    event.preventDefault();
    const bargainStartLog = this.state.bargainStartLog;
    const SNO = this.state.SNO;
    let password = this.state.password;
    console.log("bargainStartLog", bargainStartLog);
    console.log("SNO", SNO);
    console.log("password", password);

    const url = `${this.state.baseUrl}/api/client/bargain/tests/bargain-to-free`;
    const loginUrl = `${this.state.baseUrl}/api/client/user/account/login`;
    const bargainUrl = `${this.state.baseUrl}/api/client/bargain/logs`;
    const bargainDetailUrl = `${this.state.baseUrl}/api/client/bargain/start-logs/${this.state.bargainStartLog}`;
    console.log("loginUrl", loginUrl);

    const currentEnv = this.state.env;
    console.log("currentEnv", currentEnv);

    // 密码缺省时的处理
    switch (currentEnv) {
      case "local":
        password = "12345678";
        break;

      case "dev":
        password = "12345678";
        break;
      case "test":
        password = "123456";
        break;

      default:
        break;
    }

    const SnoArr = SNO.split(",");
    for (let i = 0; i < SnoArr.length; i++) {
      // 登录
      axios({
        method: "post",
        url: loginUrl,
        data: {
          SNO: SnoArr[i],
          password,
        },
      }).then((res) => {
        if (res.data.code === 2000) {
          this.popUpToast("登录成功，砍价中");
          const token = res.data.data.token;
          console.log("token", token);

          // 砍价
          axios({
            method: "post",
            url: bargainUrl,
            headers: { Authorization: `JWT ${token}` },
            data: {
              bargain_start_log: this.state.bargainStartLog,
            },
          }).then((res) => {
            if (res.data.code === 2000) {
              this.popUpToast("砍价成功");
              console.log("砍掉了", res.data.data.money);

              // 砍价详情
              axios({
                method: "get",
                url: bargainDetailUrl,
                headers: { Authorization: `JWT ${token}` },
              }).then((res) => {
                if (res.data.code === 2000) {
                  console.log("砍价详情", res.data.data);
                  this.setState((prevState) => ({
                    bargainDetailInfos: [
                      ...prevState.bargainDetailInfos,
                      res.data.data,
                    ],
                  }));
                } else {
                  this.popUpToast(res.data.message);
                }
              });
            } else {
              this.popUpToast(res.data.message);
            }
          });
        } else {
          this.popUpToast(res.data.message);
        }
      });
    }
  }

  componentDidMount = () => {
    const url = `${this.state.baseUrl}/api/client/bargain/tests/ongoing-bargain`;
    axios({
      method: "get",
      url,
    }).then((res) => {
      if (res.data.code === 2000) {
        this.setState({ onGoingBargains: res.data.data });
        const firstBargainStartLog = res.data.data[0].id;
        this.setState({ bargainStartLog: firstBargainStartLog });
      } else {
        this.popUpToast(res.data.message);
      }
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="App">
          <Form.Group>
            <h2>单次砍价（全真模拟，登录+砍价）</h2>
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

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>请选择正在进行的砍价</Form.Label>
            <Form.Control
              as="select"
              value={this.state.bargainStartLog}
              onChange={this.handleOnGoingBargainsChange}
            >
              {this.state.onGoingBargains.map((item) => (
                <option value={item.id}>
                  学号{item.user_id}正在砍
                  {item.bargain_goods__goods__name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>学号</Form.Label>
            <Form.Control
              type="text"
              value={this.state.SNO}
              onChange={this.handleSnoChange}
              placeholder="多个学号以英文逗号分隔"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>密码</Form.Label>
            <Form.Control
              type="text"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder="不输的话，开发服默认12345678，测试服默认123456"
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            {this.state.bargainDetailInfos.map((item) => {
              return (
                <>
                  <Form.Label>
                    <Badge pill variant="light">
                      砍价详情
                    </Badge>
                    <br />
                    <Badge variant="info">当前砍价进度{item.progress}</Badge>
                    &nbsp;&nbsp;
                    <Badge variant="success">
                      当前砍价总额
                      {item.total_bargain_money}
                    </Badge>
                    &nbsp;&nbsp;
                    <Badge variant="warning">商品总价值{item.price}</Badge>
                  </Form.Label>
                  <br></br>
                </>
              );
            })}
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
