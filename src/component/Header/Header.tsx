import Link from 'next/link';

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
								<a>top</a>
							</li>
						</Link>
						<Link href="/profile">
							<li className="menu">
								<a>profile</a>
							</li>
						</Link>
						<Link href="/skill">
							<li className="menu">
								<a>skill</a>
							</li>
						</Link>
						<Link href="/work">
							<li className="menu">
								<a>work</a>
							</li>
						</Link>
					</ul>
				</div>
			</header>
		</>
	);
};

export default Header;
