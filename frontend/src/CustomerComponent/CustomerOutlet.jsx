import React from 'react'
import NavCustomer from './NavCustomer'
import { Outlet } from 'react-router-dom'

const CustomerOutlet = () => {
  return (
    <>
      <NavCustomer/>
      <Outlet/>
    </>
  )
}

export default CustomerOutlet;
