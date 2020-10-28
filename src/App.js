import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



// class App extends react.Component {
  // componentDidMount() {
    // Simple GET request using axios
    // axios.get('https://api-dev.bitorange.cn/api/client/user/account/unbind-stuffs?SNO=16874&stuff=phone_num')
    //     .then(response => console.log(response));
// }


  // render () {
    // return (
      // <div className="App">
        // fjlsdjfd
      // </div>
    // );
  // }
  
// }


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', stuff: 'phone_num', env: 'dev'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnbind = this.handleUnbind.bind(this);
    this.handleEnv = this.handleEnv.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const SNO = this.state.value;
    const stuff = this.state.stuff;
    const env = this.state.env;

    if (! (SNO && stuff && env)) {
      alert('Pls complete inputs or selections.');
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
      res => {console.log(res);
      if (res.data.code === 2000) {
        alert('success')
      }
    }
    )
  }

  handleUnbind(event) {
    console.log('Stuff in state:', this.state.stuff)
    this.setState({stuff: event.target.value})
    console.log('Stuff in state:', this.state.stuff)
    console.log('Unbinding:', event.target.value)
  }

  handleEnv(event) {
    this.setState({env: event.target.value})
  }

  handleClear(event) {
    this.setState({value: ''})
  }

  render() {
    return (
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
    <Row>
    <Col>
    <Form.Control
    type='text'
    value={this.state.value}
    onChange={this.handleChange}
    placeholder='多个学号以英文逗号分割'
    ></Form.Control>
    </Col>
    <Col>
    <Button varient='outline-waring' onClick={this.handleClear}>清空</Button>
    </Col>
    </Row>
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
  <Button variant="primary" type="submit">
    确定
  </Button>

</Form>

 /**
      <form onSubmit={this.handleSubmit}>
        <label>
          Env:
          <select value={this.state.env} onChange={this.handleEnv}>
            <option value='dev'>DEV</option>
            <option value='test'>TEST</option>
          </select>
        </label>


        <label>
          SNO:
          <input            
          type="text"
          value={this.state.value}
          placeholder='Use comma as delimiter if multi SNOs provided.'
          onChange={this.handleChange} />
        </label>

        <label>
          Unbind Stuff:
          <select value={this.state.stuff} onChange={this.handleUnbind}>
            <option value='phone_num'>Phone Number</option>
            <option value='qq'>QQ</option>
            <option value='wx'>WeChat</option>
            <option value='ap'>AppleID</option>
            <option value='user'>Whole User(Destory)</option>
          </select>
        </label>
        <input type="submit" value="FIRE" />
      </form>
    ); */
    )}
    
}


export default NameForm;
