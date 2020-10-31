import './App.css';
import axios from 'axios';
import React from 'react';
import { Button, Form, InputGroup, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnbindStuff from './components/unbindStuff'
import UnBindPhoneNums from './components/unBindPhoneNums'
import BindPhoneNum from './components/bindPhoneNum'
import SystemPush from './components/systemPush'


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: 'test',
      'wxPushEnabled': null,
      'smsPushEnabled': null,
      'qualifiedUsersForWxPush': [],
      'qualifiedUsersForSmsPush': [],
      'qualifiedUsersForPushNothing': [],
      'baseUrl': 'https://test-api.duckdake.com',

      snoToBind: '',
      phoneNumToBind: '',
    };

    this.handleUnbind = this.handleUnbind.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
    this.handleListPushableUsers = this.handleListPushableUsers.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handleQualifyUsers = this.handleQualifyUsers.bind(this);
    this.handleChangeQualify = this.handleChangeQualify.bind(this);
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



  render() {
    return (
      <div class='tool-box'>

        <UnbindStuff></UnbindStuff>
        <UnBindPhoneNums></UnBindPhoneNums>
        <BindPhoneNum></BindPhoneNum>
        <SystemPush></SystemPush>
        <br></br>
        <br></br>
      </div>
    )

  }
}

export default NameForm;
