import axios from "axios";
import React from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UnbindPhoneNums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: "test",
      baseUrl: "https://test-api.duckdake.com",
      phoneNumsToUnbind: ""
    };

    this.handleEnv = this.handleEnv.bind(this);
    this.handleUnbindPhoneNums = this.handleUnbindPhoneNums.bind(this);
    this.handleSubmitUnbindPhoneNums = this.handleSubmitUnbindPhoneNums.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear(event) {
    this.setState({value: ""});
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

  handleUnbindPhoneNums(event) {
    this.setState({phoneNumsToUnbind: event.target.value});
  }

  handleSubmitUnbindPhoneNums(event) {
    event.preventDefault();
    const phone_num = this.state.phoneNumsToUnbind;
    const url = `${
      this.state.baseUrl
    }/api/admin/system/push/users/phone-num/unbind`;
    console.log("phoneNumsToUnbind:", phone_num);

    axios({method: "post", url, data: {
        phone_num
      }}).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("解绑成功");
      } else {
        this.popUpToast(res.data.message);
      }
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={
            this.handleSubmitUnbindPhoneNums
          }
          className="App">
          <Form.Group>
            <h2>解绑手机</h2>
            <hr/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
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
            <Form.Label>手机号</Form.Label>

            <Form.Control type="text"
              value={
                this.state.phoneNumsToUnbind
              }
              onChange={
                this.handleUnbindPhoneNums
              }
              placeholder="多个手机号以英文逗号分割"
              required></Form.Control>
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

export default UnbindPhoneNums;
