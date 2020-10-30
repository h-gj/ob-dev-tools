import './App.css';
import axios from 'axios';
import React from 'react';
import { Button, Form, InputGroup, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      stuff: 'phone_num',
      env: 'test',
      'wxPushEnabled': null,
      'smsPushEnabled': null,
      'qualifiedUsersForWxPush': [],
      'qualifiedUsersForSmsPush': [],
      'qualifiedUsersForPushNothing': [],
      'baseUrl': 'https://test-api.duckdake.com',
      phoneNumsToUnbind: '',
      snoToBind: '',
      phoneNumToBind: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnbind = this.handleUnbind.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
    this.handleListPushableUsers = this.handleListPushableUsers.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handleQualifyUsers = this.handleQualifyUsers.bind(this);
    this.handleChangeQualify = this.handleChangeQualify.bind(this);
    this.handleUnbindPhoneNums = this.handleUnbindPhoneNums.bind(this);
    this.handleSubmitUnbindPhoneNums = this.handleSubmitUnbindPhoneNums.bind(this);
    this.handleBindPhoneNum = this.handleBindPhoneNum.bind(this);
    this.handleBindSno = this.handleBindSno.bind(this);
    this.handleSubmitBindPhoneNum = this.handleSubmitBindPhoneNum.bind(this);



    //
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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
    const SNO = this.state.value;
    const stuff = this.state.stuff;
    const env = this.state.env;

    if (!(SNO && stuff && env)) {
      this.popUpToast('请填写完整信息')
      return;
    }

    // return;

    const url = `${this.state.baseUrl}/api/client/user/account/unbind-stuffs?SNO=${SNO}&stuff=${stuff}`;

    axios.get(url).then(
      res => {

        if (res.data.code === 2000) {
          this.popUpToast('清除成功')
        }
      }
    )
  }

  handleUnbind(event) {

    this.setState({ stuff: event.target.value })


  }

  handleEnv(event) {
    const env = event.target.value
    var baseUrl = '';
    console.log('Selected env:', env)
    if (env === 'dev') {
      baseUrl = 'https://api-dev.bitorange.cn';
    } else if (env === 'test') {
      baseUrl = 'https://test-api.duckdake.com';
    } else {
      baseUrl = 'http://localhost:8000'
    }
    this.setState({ env: env, baseUrl: baseUrl })

  }

  handleClear(event) {
    this.setState({ value: '' })
  }

  //
  handleListPushableUsers(event) {
    console.log('Env', this.state.env);
    console.log('Base Url', this.state.baseUrl);
    const url = `${this.state.baseUrl}/api/admin/system/push/qualified-users`
    axios.get(url).then(
      res => {
        const data = res.data.data;
        this.setState({
          wxPushEnabled: data.wx_push_enabled,
          smsPushEnabled: data.sms_push_enabled,
          qualifiedUsersForWxPush: data.qualified_users_for_wx_push.join(', '),
          qualifiedUsersForSmsPush: data.qualified_users_for_sms_push.join(', '),
          qualifiedUsersForPushNothing: data.qualified_users_for_push_nothing.join(', '),
        })

        console.log('Response of list pushable users:', data)
      }
    )
  }

  handlePush(event) {
    const url = `${this.state.baseUrl}/api/admin/system/push`
    const confirm = window.confirm('确定执行推送吗？')
    if (confirm !== true) {
      return
    }

    axios.post(url).then(
      res => {
        if (res.data.code === 2000) {
          this.popUpToast('推送成功')
        }
      }
    )
  }

  handleQualifyUsers(event) {
    const SNO = this.state.usersToQualify;
    const url = `${this.state.baseUrl}/api/admin/system/push/users/batch-make-qualified`;
    console.log('SNO:', SNO)

    axios({
      method: 'post',
      url,
      data: {
        SNO
      }
    }).then(
      res => {
        if (res.data.code === 2000) {
          this.popUpToast('赋予资格成功')
        }
      }
    )
  }

  handleChangeQualify(event) {
    this.setState({ usersToQualify: event.target.value })
  }

  handleUnbindPhoneNums(event) {
    this.setState({ phoneNumsToUnbind: event.target.value })
  }

  handleSubmitUnbindPhoneNums(event) {
    event.preventDefault();
    const phone_num = this.state.phoneNumsToUnbind;
    const url = `${this.state.baseUrl}/api/admin/system/push/users/phone-num/unbind`;
    console.log('phoneNumsToUnbind:', phone_num)

    axios({
      method: 'post',
      url,
      data: {
        phone_num
      }
    }).then(
      res => {
        if (res.data.code === 2000) {
          this.popUpToast('解绑成功')
        }
      }
    )
  }


  // 绑定手机
  handleBindPhoneNum(event) {
    this.setState({ phoneNumToBind: event.target.value })
  }

  handleBindSno(event) {
    this.setState({ snoToBind: event.target.value })
  }

  handleSubmitBindPhoneNum(event) {
    event.preventDefault();
    const phone_num = this.state.phoneNumToBind;
    const SNO = this.state.snoToBind;
    const url = `${this.state.baseUrl}/api/admin/system/push/users/phone-num/bind-or-change`;
    console.log('phoneNumToBind:', phone_num)
    console.log('snoToBind:', SNO)

    axios({
      method: 'post',
      url,
      data: {
        phone_num,
        SNO
      }
    }).then(
      res => {
        if (res.data.code === 2000) {
          this.popUpToast('绑定成功')
        }
      }
    )
  }


  render() {
    return (
      <div class='tool-box'>
        <h3>解绑一切</h3>
        <hr></hr>

        <Form onSubmit={this.handleSubmit} className='App'>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>请选择环境</Form.Label>
            <Form.Control as='select' value={this.state.env} onChange={this.handleEnv}>
              <option value='test'>测试服</option>
              <option value='dev'>开发服</option>
              <option value='local'>本地</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>学号</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                type='text'
                value={this.state.value}
                onChange={this.handleChange}
                placeholder='多个学号以英文逗号分割'
              ></Form.Control>

              <InputGroup.Append>
                <Button variant='outline-warning' onClick={this.handleClear}>清空</Button>
              </InputGroup.Append>
            </InputGroup>


          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>解绑项</Form.Label>
            <Form.Control as="select" value={this.state.stuff} onChange={this.handleUnbind}>
              <option value='phone_num'>手机号</option>
              <option value='wx'>微信</option>
              <option value='qq'>QQ</option>
              <option value='ap'>AppleID</option>
              <option value='user'>整个用户（删除）</option>
            </Form.Control>
          </Form.Group>
          <Button variant="warning" type="submit" size='lg' block>确定</Button>

        </Form>

        <br></br>
        <br></br>
        <h3>解绑手机</h3>
        <hr></hr>

        <Form onSubmit={this.handleSubmitUnbindPhoneNums} className='App'>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>请选择环境</Form.Label>
            <Form.Control as='select' value={this.state.env} onChange={this.handleEnv}>
              <option value='test'>测试服</option>
              <option value='dev'>开发服</option>
              <option value='local'>本地</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>手机号</Form.Label>

            <Form.Control
              type='text'
              value={this.state.phoneNumsToUnbind}
              onChange={this.handleUnbindPhoneNums}
              placeholder='多个手机号以英文逗号分割'
            ></Form.Control>
          </Form.Group>

          <Button variant="warning" type="submit" size='lg' block>确定</Button>

        </Form>
        <br></br>
        <br></br>

        <h3>绑定手机</h3>
        <hr></hr>

        <Form onSubmit={this.handleSubmitBindPhoneNum} className='App'>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>请选择环境</Form.Label>
            <Form.Control as='select' value={this.state.env} onChange={this.handleEnv}>
              <option value='test'>测试服</option>
              <option value='dev'>开发服</option>
              <option value='local'>本地</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>手机号</Form.Label>
            <Form.Control
              type='text'
              value={this.state.phoneNumToBind}
              onChange={this.handleBindPhoneNum}
              placeholder='若该手机已绑定其他学号，则会自动解绑之前的学号'
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>学号</Form.Label>
            <Form.Control
              type='text'
              value={this.state.snoToBind}
              onChange={this.handleBindSno}
              placeholder='多个手机号以英文逗号分割'
            ></Form.Control>
          </Form.Group>

          <Button variant="warning" type="submit" size='lg' block>确定</Button>

        </Form>

        <br></br>
        <br></br>
        <div className='system-push'>
          <h3>服务号推送测试</h3>
          <hr></hr>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>请选择环境</Form.Label>
            <Form.Control as='select' onChange={this.handleEnv} value={this.state.env}>
              <option value='test'>测试服</option>
              <option value='dev'>开发服</option>
              <option value='local'>本地</option>
            </Form.Control>
          </Form.Group>
          <Button variant="outline-warning" type="submit" onClick={this.handleListPushableUsers}>查看符合推送资格的用户</Button>
          <Button variant="warning" type="submit" onClick={this.handlePush}>执行推送</Button>
          <ToastContainer />
          <br></br>

          <div>
            <Badge variant="secondary">微信开关</Badge><Badge variant="primary" id='wx-push-enabled'>{this.state.wxPushEnabled === null ? '' : this.state.wxPushEnabled === true ? '已开启' : '未开启'}</Badge >
          </div>


          <div>
            <Badge variant="secondary">短信开关</Badge><Badge variant="warning" id='sms-push-enabled'>{this.state.wxPushEnabled === null ? '' : this.state.smsPushEnabled === true ? '已开启' : '未开启'}</Badge>
          </div>

          <div>
            <Badge variant="secondary">可短信推送的用户</Badge><Badge variant="success" id='qualified_users_for_sms_push'>{this.state.qualifiedUsersForSmsPush || '无'}</Badge>
          </div>

          <div>
            <Badge variant="secondary">可服务号推送的用户</Badge><Badge variant="danger" id='qualified_users_for_wx_push'>{this.state.qualifiedUsersForWxPush || '无'}</Badge>
          </div>

          <div>
            <Badge variant="secondary">符合推送资格但无推送渠道的用户</Badge><Badge variant=" light" id='qualified_users_for_push_nothing'>{this.state.qualifiedUsersForPushNothing || '无'}</Badge>
          </div>

          <br></br>

          <div>
            <Form.Group>
              <Form.Label>赋予推送资格（不是会员=>会员，最近7天有学习=>未学习，推送次数大于等于3=>2，请确保<i><b>已绑定了手机号或服务号</b></i>）</Form.Label>

              <InputGroup className="mb-3">
                <Form.Control
                  type='text'
                  // value={this.state.usersToQualify}
                  onChange={this.handleChangeQualify}
                  placeholder='多个学号以英文逗号分割'
                ></Form.Control>

                <InputGroup.Append>
                  <Button variant='warning' onClick={this.handleQualifyUsers}>赋予资格</Button>
                </InputGroup.Append>
              </InputGroup>


            </Form.Group>

          </div>
        </div>


      </div >

    )
  }

}


export default NameForm;
