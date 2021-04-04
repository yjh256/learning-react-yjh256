// '회사 소개'의 하위 메뉴
export const AboutMenu = ({match}) =>
  <div className="about-menu">
    <li>
      <NavLink to="/about" style={match.isExact && selectedStyle}>
        [회사]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/history" activeStyle={selectedStyle}>
        [연혁]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/services" activeStyle={selectedStyle}>
        [서비스]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/location" activeStyle={selectedStyle}>
        [위치]
      </NavLink>
    </li>
  </div>

// About component에 대한 경로를 추가한다.
export const About = ({ match }) =>
  <PageTemplate>
    <section className="about">
      <Route component={AboutMenu} />
      <Route exact path="/about" component={Company} />
      <Route path="/about/history" component={History} />
      <Route path="/about/services" component={Services} />
      <Route path="/about/location" component={Location} />
    </section>
  </PageTemplate>
