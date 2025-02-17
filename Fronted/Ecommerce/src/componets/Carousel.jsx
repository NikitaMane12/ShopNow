import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselComponent = () => {
  return (
    <Carousel>
      {/* First slide */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://sslimages.shoppersstop.com/sys-master/root/h96/h8c/30875255210014/Manyavar-Banner-web-%281840-x-500%29-87549.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      {/* Second slide */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://sslimages.shoppersstop.com/sys-master/root/h4d/he4/31150861058078/11_Kay_Beauty_Celeb-23.jpg"
          alt="Second slide"
        />
      </Carousel.Item>

      {/* Third slide */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://sslimages.shoppersstop.com/sys-master/root/h31/h14/31164399550494/5_Titan-Raga_Celeb_23.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
