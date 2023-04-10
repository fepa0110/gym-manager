import Head from "next/head";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<style>
                    {`
                    header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 999;
                    }
                `}
				</style>
			</Head>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default Layout;
