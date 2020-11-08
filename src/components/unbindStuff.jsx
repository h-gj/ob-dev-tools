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
      stuffs: "",
      env: "test",
      baseUrl: "https://test-api.duckdake.com",
      phone_num_selected: false,
      wx_selected: false,
      qq_selected: false,
      ap_selected: false,
      all_selected: false,
      user_selected: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleUnbindItemsChange = this.handleUnbindItemsChange.bind(this);
    
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
    let stuffs = this.state.stuffs;
    const wx_selected = this.state.wx_selected;
    const qq_selected = this.state.qq_selected;
    const ap_selected = this.state.ap_selected;
    const phone_num_selected = this.state.phone_num_selected;
    const all_selected = this.state.all_selected;
    const user_selected = this.state.user_selected;

    if(wx_selected) {
      stuffs += 'wx,'
    }
    if(qq_selected) {
      stuffs += 'qq,'
    }
    if(ap_selected) {
      stuffs += 'ap,'
    }
    if(phone_num_selected) {
      stuffs += 'phone_num,'
    }
    if(all_selected) {
      stuffs += 'qq,wx,ap,phone_num,'
    }
    if(user_selected) {
      stuffs += 'user,'
    }
    if(stuffs === '') {
      this.popUpToast("不选择解绑项，给你解绑个🔨")
      return
    }

    if (user_selected === true) {
      const confirm = window.confirm(`你确定要删除${SNO}吗？`);
      if (confirm !== true) {
        return;
      }
    }

    const url = `${
      this.state.baseUrl
    }/api/client/user/account/unbind-stuffs?SNO=${SNO}&stuffs=${stuffs}`;

    axios.get(url).then((res) => {
      if (res.data.code === 2000) {
        this.popUpToast("解绑成功");
      } else {
        this.popUpToast(res.data.message);
      }
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

  handleUnbindItemsChange(item) {
    console.log('Check box changed.');
    let selectedItemToFlip = {}
    switch (item) {
      case 'qq':
        selectedItemToFlip['qq_selected'] = !this.state.qq_selected;
        break;
      case 'wx':
        selectedItemToFlip['wx_selected'] = !this.state.wx_selected;
        break;
      case 'ap':
        selectedItemToFlip['ap_selected'] = !this.state.ap_selected;
        break;
      case 'phone_num':
        selectedItemToFlip['phone_num_selected'] = !this.state.phone_num_selected;
        break;
      case 'all':
        selectedItemToFlip['all_selected'] = !this.state.all_selected;
        break;
      case 'user':
        selectedItemToFlip['user_selected'] = !this.state.user_selected;
        break;
      default:
        break;
    }
    this.setState(selectedItemToFlip);
    console.log('selectedItemToFlip:', selectedItemToFlip)
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

          <Form.Group controlId="formBasicCheckbox">
            <Form.Label>请选择解绑项（可多选哦）</Form.Label>
            <Form.Check type="checkbox" label="手机号" defaultChecked={this.state.phone_num_selected} onChange={() => this.handleUnbindItemsChange('phone_num')} />
            <Form.Check type="checkbox" label="微信" defaultChecked={this.state.wx_selected} onChange={() => this.handleUnbindItemsChange('wx')}/>
            <Form.Check type="checkbox" label="QQ" defaultChecked={this.state.qq_selected} onChange={() => this.handleUnbindItemsChange('qq')}/>
            <Form.Check type="checkbox" label="AppleID" defaultChecked={this.state.ap_selected} onChange={() => this.handleUnbindItemsChange('ap')}/>
            <Form.Check type="checkbox" label="All of above" defaultChecked={this.state.all_selected} onChange={() => this.handleUnbindItemsChange('all')}/>
            <Form.Check type="checkbox" label="The whole user" defaultChecked={this.state.user_selected} onChange={() => this.handleUnbindItemsChange('user')}/>
          </Form.Group>
          <Button variant="warning" type="submit" size="lg" block>
            确定
          </Button>
        </Form>
      </div>
    );
  }
}

export default UnbindStuff;
