import React from 'react'
import "./Card.css"
const Card = () => {
    return (
        <div className="card">
          <div className="card__image">
            <img alt='' src="https://images.unsplash.com/photo-1521139869420-edaae1bc7b9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" />
          </div>
          <div className="card__copy">
              <h1>Robin Hood's Bay</h1>
              <h2>27 October, Noon.</h2>
            <p>
              --Most strange; no news yet of the ship we wait for. Mrs. Harker
              reported last night and this morning as usual: "lapping waves and
            </p>
          </div>
        </div>
      );
}

export default Card
