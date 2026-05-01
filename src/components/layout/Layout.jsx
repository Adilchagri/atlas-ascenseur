import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WhatsAppFab from './WhatsAppFab.jsx';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
