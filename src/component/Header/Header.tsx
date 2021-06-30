import Link from "next/link";

const Header: React.FC = () => {
  return (
    <>
      <header className="header-8">
        <div className="box box-logo">
          <img className="logo-img" src="" />
        </div>
        <div className="sp-nav">
          <i className="fas fa-bars"></i>
        </div>
        <div className="box box-nav">
          <ul className="inner-nav">
            <Link href="/">
              <li className="menu">
                <a>Profile</a>
              </li>
            </Link>
            <Link href="/Skill/skill" as="/skill">
              <li className="menu">
                <a>Skill</a>
              </li>
            </Link>
            <Link href="/Work/work" as="/work">
              <li className="menu">
                <a>Work</a>
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
