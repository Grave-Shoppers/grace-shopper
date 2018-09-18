import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className="text-center">Welcome to Grave Hoppers</h1>
      <div>
        <img
          src="https://preview.ibb.co/ef324p/img_2454.jpg"
          className="center"
          alt="img_2454"
          border="0"
        />
      </div>
      <h2 className="text-center">
        where you can find all your Halloween needs!
      </h2>
    </div>
  )
}

export default Home
