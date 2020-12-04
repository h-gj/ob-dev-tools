import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnbindStuff from './components/unbindStuff'
import BindPhoneNum from './components/bindPhoneNum'
import SystemPush from './components/systemPush'
import React from "react";
import { Col, Row, Nav, Tab } from 'react-bootstrap'
import UnbindPhoneNums from './components/unBindPhoneNums';
import BatchCreateUsers from './components/batchCreateUsers';
import Bargain from './components/bargain';
import SingleBargain from './components/singleBargain';
import Home from './components/home';


export default function App() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <ToastContainer />
      <Row>
        <Col sm={2}
          className="leftColumn">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="fifth">更新日志</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">解绑一切</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">解绑手机</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">绑定手机</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">系统推送</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="seventh">批量注册</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="eighth">批量砍价</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ninth">单个砍价</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}
          className="rightColumn">
          <Tab.Content>
            <Tab.Pane eventKey="fifth">
              <Home />
            </Tab.Pane>
            <Tab.Pane eventKey="first">
              <UnbindStuff />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <UnbindPhoneNums />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <BindPhoneNum />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <SystemPush />
            </Tab.Pane>
            <Tab.Pane eventKey="seventh">
              <BatchCreateUsers />
            </Tab.Pane>
            <Tab.Pane eventKey="eighth">
              <Bargain />
            </Tab.Pane>
            <Tab.Pane eventKey="ninth">
              <SingleBargain />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
