import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnbindStuff from './components/unbindStuff'
import BindPhoneNum from './components/bindPhoneNum'
import SystemPush from './components/systemPush'
import React from "react";
import {Col, Row, Nav, Tab} from 'react-bootstrap'
import UnbindPhoneNums from './components/unBindPhoneNums';


export default function App() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <ToastContainer/>
      <Row>
        <Col sm={2}
          className="leftColumn">
          <Nav variant="pills" className="flex-column">
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
          </Nav>
        </Col>
        <Col sm={10}
          className="rightColumn">
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <UnbindStuff/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <UnbindPhoneNums/>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <BindPhoneNum/>
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <SystemPush/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
