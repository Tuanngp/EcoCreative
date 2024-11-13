
import { Footer } from "./Footer";
import { Header } from "./Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="base-layout">
      <Header />
      <div className="content-wrapper" style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1}}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;