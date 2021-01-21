import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Drawer } from 'antd';

const Button = styled.button`
  border: none;
  background-color: #ff914d;
  font-family: 'Caveat Brush', cursive;
  font-style: italic;
  letter-spacing: 2px;
  font-weight: 400;
  font-size: 22px;
  color: white;
  border-radius: 18px;
  padding: 8px;
  padding-left: 15px;
  padding-right: 15px;
  -webkit-appearance: none;
  margin: 1rem 0;
  text-align: center;
  &:hover {
    background-color: #4c4c49;
    color: #b5b5b5;
    transition: all 200ms linear;
  }
  width: 100%;
`;

export default function MenteeMenu(props) {
  return (
    <Drawer
      title="Student Menu"
      placement="left"
      closeable={false}
      visible={true}
      closeIcon={false}
      mask={false}
      width="300px"
    >
      <NavLink to="/Dashboard">
        <Button>Home</Button>
      </NavLink>
      <NavLink to="/Calendar">
        <Button>Calendar</Button>
      </NavLink>
      <NavLink to="/Profile">
        <Button>Profile</Button>
      </NavLink>
      <NavLink to="/Mentor">
        <Button>Mentor</Button>
      </NavLink>
      <NavLink to="/Logout">
        <Button>Logout</Button>
      </NavLink>
    </Drawer>
  );
}
