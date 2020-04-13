import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import './Navigation.scss';

const cateToText = {
  'ALL': '전체',
  'T': '상의',
  'O': '원피스',
  'H': '머리 장식',
  'ETC': '기타'
}

function NavigationLink({ category }) {
  return (
    <li className="navigation-item">
      <Link
        className={`${'/category/' + category === history.location.pathname ? 'selected' : ''}`}
        to={`/category/${category}`}
      >
        {cateToText[category]}
      </Link>
    </li>
  )
}

function Navigation() {
  return (
    <nav className="navigation">
      <div className="global-container">
        <ul className="navigation-items">
          <NavigationLink category="ALL" />
          <NavigationLink category="T" />
          <NavigationLink category="O" />
          <NavigationLink category="H" />
          <NavigationLink category="ETC" />
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
