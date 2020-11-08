import axios from "axios";
import React from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class BindPhoneNum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: "test",
      baseUrl: "https://test-api.duckdake.com",
      phoneNumsToUnbind: ""
    };

    this.handleEnv = this.handleEnv.bind(this);
    this.handleBindPhoneNum = this.handleBindPhoneNum.bind(this);
    this.handleBindSno = this.handleBindSno.bind(this);
    this.handleSubmitBindPhoneNum = this.handleSubmitBindPhoneNum.bind(this);
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

  // 绑定手机
  handleBindPhoneNum(event) {
    this.setState({phoneNumToBind: event.target.value});
  }

  handleBindSno(event) {
    this.setState({snoToBind: event.target.value});
  }

  handleSubmitBindPhoneNum(event) {
    event.preventDefault();
    const phone_num = this.state.phoneNumToBind;
    const SNO = this.state.snoToBind;
    const url = `${
      this.state.baseUrl
    }/api/admin/system/push/users/phone-num/bind-or-change`;
    console.log("phoneNumToBind:", phone_num);
    console.log("snoToBind:", SNO);

    axios({
      method: "post",
      url,
      data: {
        phone_num,
        SNO
      }
    }).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("绑定成功");
      } else {
        this.popUpToast(res.data.message);
      }
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={
            this.handleSubmitBindPhoneNum
          }
          className="App">
          <Form.Group>
            <h2>绑定手机</h2>
            <hr/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
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
                this.state.phoneNumToBind
              }
              onChange={
                this.handleBindPhoneNum
              }
              placeholder="若该手机已绑定其他学号，将自动解绑之前的学号"
              required></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>学号</Form.Label>
            <Form.Control type="text"
              value={
                this.state.snoToBind
              }
              onChange={
                this.handleBindSno
              }
              placeholder="请输入学号"
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

export default BindPhoneNum;
