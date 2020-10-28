import './App.css';
import axios from 'axios';
import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', stuff: 'phone_num', env: 'dev' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnbind = this.handleUnbind.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const SNO = this.state.value;
    const stuff = this.state.stuff;
    const env = this.state.env;

    if (!(SNO && stuff && env)) {
      alert('请填写完整信息');
      return;
    }


    console.log('SNO to commit:', SNO);
    console.log('Stuff to commit:', stuff);
    console.log('Env to commit:', env);
    // return;

    var url = '';
    if (env === 'test') {
      url = `https://test-api.duckdake.com/api/client/user/account/unbind-stuffs?SNO=${SNO}&stuff=${stuff}`;
    } else {
      url = `https://api-dev.bitorange.cn/api/client/user/account/unbind-stuffs?SNO=${SNO}&stuff=${stuff}`;
    }
    console.log('url to request:', url);
    axios.get(url).then(
      res => {
        console.log(res);
        if (res.data.code === 2000) {
          alert('success')
        }
      }
    )
  }

  handleUnbind(event) {
    console.log('Stuff in state:', this.state.stuff)
    this.setState({ stuff: event.target.value })
    console.log('Stuff in state:', this.state.stuff)
    console.log('Unbinding:', event.target.value)
  }

  handleEnv(event) {
    this.setState({ env: event.target.value })
  }

  handleClear(event) {
    this.setState({ value: '' })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className='App'>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>环境</Form.Label>
            <Form.Control as='select' value={this.state.env} onChange={this.handleEnv}>
              <option value='dev'>开发服</option>
              <option value='test'>测试服</option>
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

      </div>

    )
  }

}


export default NameForm;
