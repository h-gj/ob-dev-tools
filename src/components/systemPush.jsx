import axios from "axios";
import React from "react";
import { Button, Form, InputGroup, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SystemPush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: "test",
      wxPushEnabled: null,
      smsPushEnabled: null,
      qualifiedUsersForWxPush: [],
      qualifiedUsersForSmsPush: [],
      qualifiedUsersForPushNothing: [],
      baseUrl: "https://test-api.duckdake.com",
    };

    this.handleEnv = this.handleEnv.bind(this);
    this.handleListPushableUsers = this.handleListPushableUsers.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handleQualifyUsers = this.handleQualifyUsers.bind(this);
    this.handleChangeQualify = this.handleChangeQualify.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear(event) {
    this.setState({ value: "" });
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

  handleClear(event) {
    this.setState({ value: "" });
  }

  //
  handleListPushableUsers(event) {
    console.log("Env", this.state.env);
    console.log("Base Url", this.state.baseUrl);
    const url = `${this.state.baseUrl}/api/admin/system/push/qualified-users`;
    axios.get(url).then((res) => {
      const data = res.data.data;
      this.setState({
        wxPushEnabled: data.wx_push_enabled,
        smsPushEnabled: data.sms_push_enabled,
        qualifiedUsersForWxPush: data.qualified_users_for_wx_push.join(", "),
        qualifiedUsersForSmsPush: data.qualified_users_for_sms_push.join(", "),
        qualifiedUsersForPushNothing: data.qualified_users_for_push_nothing.join(
          ", "
        ),
      });

      console.log("Response of list pushable users:", data);
    });
  }

  handlePush(event) {
    const url = `${this.state.baseUrl}/api/admin/system/push`;
    const confirm = window.confirm("确定执行推送吗？");
    if (confirm !== true) {
      return;
    }

    axios.post(url).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("推送成功");
      }
    });
  }

  handleQualifyUsers(event) {
    const SNO = this.state.usersToQualify;
    const url = `${this.state.baseUrl}/api/admin/system/push/users/batch-make-qualified`;
    console.log("SNO:", SNO);

    axios({
      method: "post",
      url,
      data: {
        SNO,
      },
    }).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("赋予资格成功");
      }
    });
  }

  handleChangeQualify(event) {
    this.setState({ usersToQualify: event.target.value });
  }

  render() {
    return (
      <div className="system-push">
        <h3>服务号推送测试</h3>
        <hr></hr>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>请选择环境</Form.Label>
          <Form.Control
            as="select"
            onChange={this.handleEnv}
            value={this.state.env}
          >
            <option value="test">测试服</option>
            <option value="dev">开发服</option>
            <option value="local">本地</option>
          </Form.Control>
        </Form.Group>
        <Button
          variant="outline-warning"
          type="submit"
          onClick={this.handleListPushableUsers}
        >
          查看符合推送资格的用户
        </Button>
        <Button variant="warning" type="submit" onClick={this.handlePush}>
          执行推送
        </Button>
        <ToastContainer />
        <br></br>

        <div>
          <Badge variant="secondary">微信开关</Badge>
          <Badge variant="primary" id="wx-push-enabled">
            {this.state.wxPushEnabled === null
              ? ""
              : this.state.wxPushEnabled === true
              ? "已开启"
              : "未开启"}
          </Badge>
        </div>

        <div>
          <Badge variant="secondary">短信开关</Badge>
          <Badge variant="warning" id="sms-push-enabled">
            {this.state.wxPushEnabled === null
              ? ""
              : this.state.smsPushEnabled === true
              ? "已开启"
              : "未开启"}
          </Badge>
        </div>

        <div>
          <Badge variant="secondary">可短信推送的用户</Badge>
          <Badge variant="success" id="qualified_users_for_sms_push">
            {this.state.qualifiedUsersForSmsPush || "无"}
          </Badge>
        </div>

        <div>
          <Badge variant="secondary">可服务号推送的用户</Badge>
          <Badge variant="danger" id="qualified_users_for_wx_push">
            {this.state.qualifiedUsersForWxPush || "无"}
          </Badge>
        </div>

        <div>
          <Badge variant="secondary">符合推送资格但无推送渠道的用户</Badge>
          <Badge variant=" light" id="qualified_users_for_push_nothing">
            {this.state.qualifiedUsersForPushNothing || "无"}
          </Badge>
        </div>

        <br></br>

        <div>
          <Form.Group>
            <Form.Label>
              赋予推送资格（不是会员=>会员，最近7天有学习=>未学习，推送次数大于等于3=>2，请确保
              <i>
                <b>已绑定了手机号或服务号</b>
              </i>
              ）
            </Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                // value={this.state.usersToQualify}
                onChange={this.handleChangeQualify}
                placeholder="多个学号以英文逗号分割"
              ></Form.Control>

              <InputGroup.Append>
                <Button variant="warning" onClick={this.handleQualifyUsers}>
                  赋予资格
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
      </div>
    );
  }
}

export default SystemPush;
