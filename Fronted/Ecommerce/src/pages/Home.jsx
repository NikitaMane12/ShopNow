import CarouselComponent from "../componets/Carousel";
import Navbar from "../componets/Navbar";
import Main from "../componets/Main";
import Footer from "../componets/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <CarouselComponent />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
