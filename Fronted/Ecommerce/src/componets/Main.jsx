import { useNavigate } from "react-router-dom";
import "../style/main.css";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container1">
        <h1 style={{ textAlign: "center", margin: "20px" }}>
          Look Lit Like Sanya
        </h1>
        <div className="card-container1">
          {/* Card 1 */}
          <div className="card1">
            <img
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn30z3Qp3rByW5ztkdxG5W24C2HMP3zvub5j9odYAWDGccJmVrPa4IO5Tis0S6myHnCFG89EiwdVBU3KB6PVNkE7HfvUiNLnmWumlUiUZXDYVdeKKfgNWu8w"
              height="200px"
              width="200px"
              alt="product"
              onClick={() => navigate("/mens")}
            />
            <h3>Kashish</h3>
            <p>
              Sanya Malhotra Embroidered Viscose Blend Women's Kurta Sharara
              Dupatta Set
            </p>
            <p>RS 4000</p>
            <p>Includes all taxes</p>
          </div>

          {/* Card 2 */}
          <div className="card1">
            <img
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn30z3Qp3rByW5ztkdxG5W24C2HMP3zvub5j9odYAWDGccJmVrPa4IO5Tis0S6myHnCFG89EiwdVBU3KB6PVNkE7HfvUiNLnmWumlUiUZXDYVdeKKfgNWu8w"
              height="200px"
              width="200px"
              alt="product"
              onClick={() => navigate("/mens")}
            />
            <h3>Kashish</h3>
            <p>
              Sanya Malhotra Embroidered Viscose Blend Women's Kurta Sharara
              Dupatta Set
            </p>
            <p>RS 4000</p>
            <p>Includes all taxes</p>
          </div>

          {/* Card 3 */}
          <div className="card1">
            <img
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn30z3Qp3rByW5ztkdxG5W24C2HMP3zvub5j9odYAWDGccJmVrPa4IO5Tis0S6myHnCFG89EiwdVBU3KB6PVNkE7HfvUiNLnmWumlUiUZXDYVdeKKfgNWu8w"
              height="200px"
              width="200px"
              alt="product"
              onClick={() => navigate("/mens")}
            />
            <h3>Kashish</h3>
            <p>
              Sanya Malhotra Embroidered Viscose Blend Women's Kurta Sharara
              Dupatta Set
            </p>
            <p>RS 4000</p>
            <p>Includes all taxes</p>
          </div>

          {/* Card 4 */}
          <div className="card1">
            <img
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn30z3Qp3rByW5ztkdxG5W24C2HMP3zvub5j9odYAWDGccJmVrPa4IO5Tis0S6myHnCFG89EiwdVBU3KB6PVNkE7HfvUiNLnmWumlUiUZXDYVdeKKfgNWu8w"
              height="200px"
              width="200px"
              alt="product"
              onClick={() => navigate("/mens")}
            />
            <h3>Kashish</h3>
            <p>
              Sanya Malhotra Embroidered Viscose Blend Women's Kurta Sharara
              Dupatta Set
            </p>
            <p>RS 4000</p>
            <p>Includes all taxes</p>
          </div>

          <div className="card1">
            <img
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn30z3Qp3rByW5ztkdxG5W24C2HMP3zvub5j9odYAWDGccJmVrPa4IO5Tis0S6myHnCFG89EiwdVBU3KB6PVNkE7HfvUiNLnmWumlUiUZXDYVdeKKfgNWu8w"
              height="200px"
              width="200px"
              alt="product"
              onClick={() => navigate("/mens")}
            />
            <h3>Kashish</h3>
            <p>
              Sanya Malhotra Embroidered Viscose Blend Women's Kurta Sharara
              Dupatta Set
            </p>
            <p>RS 4000</p>
            <p>Includes all taxes</p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/h19/h1a/31146587619358/Private-Brand-web_161023.jpg"
          width="100%"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/mens")}
        />
      </div>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Best of online
        </h1>
        <div className="card-container1">
          <div className="card1">
            <img
              src="https://sslimages.shoppersstop.com/sys-master/root/h89/hc9/31150860730398/Women-Indian-web_171023.jpg"
              onClick={() => navigate("/mens")}
            />
          </div>
          <div className="card1">
            <img
              src="https://sslimages.shoppersstop.com/sys-master/root/h47/hd0/31150860927006/Men-web_171023.jpg"
              onClick={() => navigate("/mens")}
            />
          </div>
          <div className="card1">
            <img
              src="https://sslimages.shoppersstop.com/sys-master/root/h67/hc3/31150860599326/Western-web_171023.jpg"
              onClick={() => navigate("/mens")}
            />
          </div>
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/h08/hd1/31150860992542/Kids-web_171023.jpg"
            />
          </div>
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/hd7/hb8/31149536051230/Bags-web_161023.jpg"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Best of online
        </h1>
        <div className="card-container1">
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/hd1/h17/31149520846878/Aurelia-%26-Libas-web_161023.jpg"
            />
          </div>
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/hd1/h17/31149520846878/Aurelia-%26-Libas-web_161023.jpg"
            />
          </div>
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/ha6/h40/31149524877342/Kids-web_161023.jpg"
            />
          </div>
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/h0b/h1b/31149525434398/GD-web_161023.jpg"
            />
          </div>
          <div className="card1">
            <img
              onClick={() => navigate("/mens")}
              src="https://sslimages.shoppersstop.com/sys-master/root/hd7/hb8/31149536051230/Bags-web_161023.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
