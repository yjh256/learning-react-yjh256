// MainMenu component
import HomeIcon from 'react-icons/lib/fa/home'
import { NavLink } from 'react-router-dom'
import './stylesheets/menus.scss'

const selectedStyle = {
  backgroundColor: "white",
  color: "slategray"
}

export const MainMenu = () =>
  <nav className="main-menu">
    <NavLink to="/">
      <HomeIcon />
    </NavLink>
    <NavLink to="/about" activeStyle={selectedStyle}>
      [회사 소개]
    </NavLink>
    <NavLink to="/events" activeStyle={selectedStyle}>
      [이벤트]
    </NavLink>
    <NavLink to="/products" activeStyle={selectedStyle}>
      [제품]
    </NavLink>
    <NavLink to="/contact" activeStyle={selectedStyle}>
      [고객 지원]
    </NavLink>
  </nav>

// MainMenu component는 PageTemplate component 안에 들어간다.
import { MainMenu } from './ui/menus'

...

const PageTemplate = ({children}) =>
  <div className="page">
    <MainMenu />
    {children}
  </div>

// PageTemplate를 사용해 각 section을 합성할 수 있다.
export const Events = () =>
  <PageTemplate>
    <section className="events">
      <h1>[이벤트]</h1>
    </section>
  </PageTemplate>

export const Products = () =>
  <PageTemplate>
    <section className="products">
      <h1>[제품]</h1>
    </section>
  </PageTemplate>

export const Contact = () =>
  <PageTemplate>
    <section className="contact">
      <h1>[고객 지원]</h1>
    </section>
  </PageTemplate>

export const About = ({ match }) =>
  <PageTemplate>
    <section className="about">
      <h1>[회사 소개]</h1>
    </section>
  </PageTemplate>
