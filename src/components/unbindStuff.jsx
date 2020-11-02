// import "./App.css";
import axios from "axios";
import React from "react";
import {Button, Form, InputGroup, FormGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UnbindStuff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      stuff: "phone_num",
      env: "test",
      baseUrl: "https://test-api.duckdake.com"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnbind = this.handleUnbind.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  popUpToast(value) {
    toast.warn(value, {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const SNO = this.state.value;
    const stuff = this.state.stuff;

    if (stuff === 'user') {
      const confirm = window.confirm(`确定要删除${SNO}这个用户吗？`);
      if (confirm !== true) {
        return;
      }
    }

    if (SNO === '10000' && stuff === 'user') {
      this.popUpToast("10000号你也敢删？");
      return
    }

    const url = `${
      this.state.baseUrl
    }/api/client/user/account/unbind-stuffs?SNO=${SNO}&stuff=${stuff}`;

    axios.get(url).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("解绑成功");
      } else {
        this.popUpToast(res.data.message);
      }
    });
  }

  handleUnbind(event) {
    this.setState({stuff: event.target.value});
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
    this.setState({env: env, baseUrl: baseUrl});
  }

  handleClear(event) {
    this.setState({value: ""});
  }

  render() {
    return (
      <div>
        <Form onSubmit={
            this.handleSubmit
          }
          className="App">
          <FormGroup>
            <h2>解绑一切</h2>
            <hr/>
          </FormGroup>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>请选择环境</Form.Label>
            <Form.Control as="select"
              value={
                this.state.env
              }
              onChange={
                this.handleEnv
            }>
              <option value="test">测试服</option>
              <option value="dev">开发服</option>
              <option value="local">本地</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>学号</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control type="text"
                value={
                  this.state.value
                }
                onChange={
                  this.handleChange
                }
                placeholder="多个学号以英文逗号分割"
                required></Form.Control>

              <InputGroup.Append>
                <Button variant="outline-warning"
                  onClick={
                    this.handleClear
                }>
                  清空
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>解绑项</Form.Label>
            <Form.Control as="select"
              value={
                this.state.stuff
              }
              onChange={
                this.handleUnbind
            }>
              <option value="phone_num">手机号</option>
              <option value="wx">微信</option>
              <option value="qq">QQ</option>
              <option value="ap">AppleID</option>
              <option value="user">整个用户（删除）</option>
            </Form.Control>
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

export default UnbindStuff;
