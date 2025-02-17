import { useEffect, useState } from "react";

import "../style/order.css";
import axios from "axios";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";

const Order = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://shopnow-3-gz50.onrender.com/order/orders"
        );
        console.log("Fetched Data:", res.data);
        setOrder(res.data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchOrders();
  }, []);
  const handleDelete = async (orderId) => {
    console.log("order--->", order);
    console.log("_id--->", orderId);
    try {
      await axios.delete(
        `https://shopnow-3-gz50.onrender.com/order/orders/${orderId}`
      );
      setOrder(order.filter((ord) => ord._id !== orderId));
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete order");
    }
  };

  return (
    <div>
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {order.map((orders) => (
            <tr key={orders._id}>
              <td>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEX///8AAAD7+/sBAQEAu//+/v78/Pz9/f0BuPpWVlYBuPvV1dV9fX27u7sAv/8Awf8eHh4AeaXw8PDq6ur09PSXl5eqqqpGRkaenp4ZGRlfX1/Q0NDAwMCUlJRRUVEAp+Q9PT0QEBAnJyd1dXWKiooAICve3t4zMzNmZmZKSkoAfqylpaWwsLBjY2MAP1YAERcAkscAZIgAMUMAn9ksLCwAb5cAiLkAWHgAPFIASmUBExkBKDcApN8Bl84AU3EBYYRVcc86AAAXBklEQVR4nM1dCVvjLBAm6d1qom2qPbVa7bZe6726q/v9/3/1hQQShkAYSKvLPs+W2gnMy8xwzBAgTZKkpt9KM77fSD4bvp/+oeXLJE1GgqEtkDQ4iZ42+bF3c73XWZyf1Wq1s/GPzXp4NOv7JEs2bFYBSEy0LgCbq6PlD0+VziYX0z6WTV8CiJeKiwQJHuA0QxdLT8okXzrXg/gpNJuNKgCJiVYBsIQ2/q+3FLHIADOgiyMfX7Xyz1tj2kJFWyQ6SqRX0wMU4O+tLNj8FzqZJunPx0BOeabwhzQzmRKCYNOS6Yo2qKUl0fzMILgidO+kh2JzV0zbSLBxo5FTGUD6uR4g2PwHbLC3QADUIB21iInN77fBC0+PSwc9zxz3TGzuFCBC2gMuQCsbFH8Z6dgU8H2jinILdFJRljnxy9jEAtyRimYaajFMFDPnPaKTYMPfIUCztP1OASAY1jVJQTvTstncNtM2c9HBc4kEvd/vL1f3T6ftOJ1+vh7++qMFSD+PStj8NhscnGkV8c+v19MwDIMgqLfr9XqQpPrT1V1Nob0p0lEVgLuxwdVYA/Dy5akexP9o6ra7yWe93aZAw9PX96LY04850bD5XTY4OFAII/7v7b4b1jkuAJCl0wdJRXkxQ6Jm85tUNFKoaJzeP8JAxCUDjDNBWD+sZZLLkTJbLLJpIcEtAmwuVADfPmN8OcCiBFkm7D54MkCamZkBlqTtrujXGSoB4GsQ1DEA41+C0ztVD7VSsCl+uzk5UKfFKELYq4U6DxUA79phHQuwG+vqlWzBcXqOWoWq82+9M68k3ZiYtpnJzBQAD8PAAiBV1dPHYiknKjbZt2mxRUCHfL09gFER4O/PsG4HkP7lL4pN9q05LgNYS3R8Wz3upADw8jSwBhj/IXzBsMm+XRtXZ+ttrQez5URWwWPbBWCcocYosXmcNzKrmn1bFAcYCelZv7kVgPFkTQL45gqQQYTFXRO56jTlpqFUUZq4b6saQLLcmgRpCg7l4ry+CmCLZHR619bQBBDlVevJ5f6sAjAeGV8kfr2lCqBPzk0Aa15nCxL0yUJuuI8AMq2cqmkA0l/CvzK/PVA1Z+RCg0vMNLYAcCYDfLUfJqQ26P6R+J2AqjkjAzNAaohVgy9kA8qtef9VANhNfwlOeWvxcqcEVM0YOSod8ZPMqHrwZSpJ8LKyBOuK3uaWKADSEbFcgnSoqRgfZIO9MNl+spyqqc00uJMabiVWnXFEVuszT5myJ/MVlWMAdAUbznuwmWznAAPq4ajnJMGHVO6eWLXISNTv9weDfppoZgabZlpJRRup81CwhZ9tF4Bh+/Du8fHvfQoyIQkfJLcNqBoy0uJ/TTI+5GhYTYLJvEKcJh+GJv1TAXxlBTzSySwj6UqL/hstQFkqE2CMJxUBzqBt/3aS4GEGo3aakbBxP2vBjQ5gwek0B7O4cb8SwHhlDzovKsK2G0AmxSCnlfqMQSsbgksBst49m+z0Kjmocu9TWlzXWYJcYPcB/ymEHjjmldJFuXOmm/0xaJq5PtyI2EbCm4sVF3ektlM1CLDm/Q05bTrs5zOJiVB1mV+0STpA9hNtuBGzEWgP2spHUE2CceYxzGjpmCh0iuM+CqCf+oyECEjkrKLxT8dA4x8rqijNJAhT2uAKzsmmWdUGu5pCp2vPGWCjNYCdwUtQGaB3F2a0+ew05XeYVW3oOHw4lA5dVbTB56RZcU9152EiK+UwyGmDR6Ait0Te16aLTRwDL8GJM0A/HnlEgJfVJUh745y2fgjKP/ObOICZ85Y9WSGOsQQm/R5UB/ga5LTt4FMEmDkzYJRbwXQj061s6eUmQUJ+CAzUvKvC0t4a4GEoAIz/B1rMwsINX5JgQSrMg5M9OSL2KS2uCQB6n4EEI1kxhHgbjI0QAgwvAcmRUHV5fLADZH8+6eDT7XU/Ly6CS+y2BCNeMbzf3b18FJVXJ0EJYD38BaaYcyxAaohFBxU6XWeaMYXrG2lZEVyxB37BABRKRVPamExkc82V0hgf7JndG6ANJNoL7nPeB5PSPyEE+JA99NgNnADW61eA5FiKcuvjg4o4iiKj/cXbZ9Z45Im08VgtArwXHnpr1+1VNKat3wOScy4zY4w+C6RYCE6EPk6LIyNA+ysEIZZL8aG3vFvFA4wHxA9YNVeechWlXo65SYIGpKmDliHkJA91sRd9AsXFU9bAaphIdRUuL1JPBgagz/zwZSpaLsr9tLgRIHmpC+Ng8Co99NYNLIYJ1hj1NgDIEGL2tSVrRBRA9S83aXEpQl79S5ADTBDCh97agZUNJgrRhh0Dg2QGSKif2lpwQmaWeixHYMbxEuYA67SjkYp7q3fxvSjLtCFtCkmIkernlyN3G6QpajZ5KTnJf/naNW19uYLHdmBhg0k7ncIuHQ9Q9j7AjP4Xllkyl+wRoH0PBYD14Feh4WJbtFLRuJBPwOaZxc7EpgzQZhfvWZ+NRzdgxvEYipPtbvt3sbg/dgDr9VdA+4OvCRD7ZMgxqMXGBr0xCyHkW0zSX36GYDURnP7ENJxeRemIfwhoO3DEL48YjWB1+HRwwRw7pNVaQe6DLlguUYhWAIvrZykavMcDFmaAjdQQc4DXvTRN+acus4q4k6TlN3zI9FNdBEghGk26TEXpxOgNPATWeaZVOlja1fizmZOgkGnwTDNbHLdI6ww002sAAMYTgI+aAWCZitJwt/hQje/iAvva9Kt0GL7YlNJqi+uALvghhADprOsnVkVVAJNJm1DBivGAAhivEcXqxpFtPD8huQDcP4YSQG6LGmM0qKg8MfK8ZlY1xpmbjYhpEVMHCQrDRVJKTYiN5WN2DVZkAZDuyRAfWmQ8oLzVfB8TK2JoF+5mJCvI/X0gA4zTh1Mvmn5eghbcyyDhXIETUG8nf4EDLUHS6p8Dpv8GKnNKbNEFYD6jSR+6kfe1GdRuCOvtowFmEoyXYbegmWoKXrupotqraKyk/0EVGRR2RZVvI1GGL+wANtJNiYXxQopyU4gOAOvpvC9jc5GbCQpgEtwUOrmhC8DEEIXe7jFUAIwhfvzUq6hqmEgTnJTGZogEmDG9AQu4jgtA6vUG+vcUKADWuS2WAFRIsP4IAHrThryvzQAw33ueluAEkC4RxZZ+DxUAu202aFipaP0TAjwQzB+3V00RvrAHSHgEkTPyUVcBTId+llAq2m6nc9JcRfaIAAk5OwEAY0PEDxO5z5nt28sYea9rpBJ0057x7UnlNlRs+7qHAMG2L+z0awOKOCZltGoJxiT7EiP32gBU0P68vz8VAzV6FY0zf2C5CxESdjvlEI4Xvr0E44x/IDASf/5RqChnOnkhDwew4HO8EXnAbqecwrnw1F6CDd5Ogkm/hDqpgEypiso7TWpxPwMgqQEWmPY9MF4MHSQYp748nD8FKIClEfHwEQKU3u5GApTDFyd2vWimGfLL95ftrkpF1RJUN0byXom4bjqIzAAVLkYpfDHutxwANpp9QQ/S/jRAA9RI8F72YY0AJBPAjGk5fDFtOACMaYcAIDNFdxuES/uk3DGEpAKo3oTAwhcc4VwWMg4gIQcyR1chCqBaRQM644ZrkVnBzYTdjHcCtH2iAWh8fXgGjcajLyQ422DQ/SMDPDEC1Lr5h7AotYvHJME43RZeseJ+N+teNGg/SgpBpzMSJPx2yqkH/PJTrASl9iL5/rZsDnIV6gAabPCyAHBUkBl+O6XveQLAeEQsHej189Zs7ia010MQ2Kto+FT0B2xyHjKlhN9KdjpJ4YtNiYvHsINl7RU4e28H1gBf5WHCo84LNEBFuFsKXxTe80PYYErb/FF0/P7+lI3RMFWr//IKKkqjsbLyqBlR71WTwhdTV4CJP0N2G8aa2g0gwLJOJvz8rQCo2qVtAVB+XWLkDFAOtbHMH/qSCEpFw9Nf8On0Y63pN/HbKTsl4QsbgLHGHxUBxunuiatqmYoG3Zeap7DBhd8sBYjYTgnDF2eRM8AWSaa5MkCK8ZPta9MBjKX8Ah/iAM+jVlWAJeELa4DJKkPubZIGfLxqh1n4VFLRIOx+yiF/njkfNNQjlAXAVv8MlKkIX9ic9FI4xYxnau/0/J0ggACDGN7TQ+GkIZ55HuiGdqwNJiRy+MJdgqXbybzklKGnIEw21SaHDYWn94d3v/PfCyra185d0BKkT8LwxZkcvrA96QW6+WWmKc73Xw8vD/+9v3FsOtoTX6OilgATQxRamp/M6CLBhGSmkqBKpDpps89lS93JED4rRTY5IdEYtB4MX7gcopkf91WQoAJOkSTNHBH1MEFYlBsPUAhfJNVNXCWYzxn9pYF7M9Jxz+CAt3o5Kw9fJIU3KwKkJPs1g5wMAJf+FgE2hPcRk488fFHhnNf+WtWD6HBJNjiexTWVRxgsVLQYvhgpziu09qHGHc4BWnCSBPcicxDMQoL0SXX4ouKRbkTaQIw81tPrDFBRPiuACSuCK7BRRosFSDPJQcJ4gDR1priq7QAqwxfbOWu5Pzow4RIPxlz3kG2LbXJOIoUvRlsD2Ir75VmHqYZRgvNBOZui84XYSJCI4Qta3aayDULawfWxZwJ4vmSnleKswxJgFr5gLU3DFy7RYG0HTsjqZg3uDYAAn+e9bL6J3UpgoaJi+ILVy8MXFVUU0vqDm4vJ2PMg0KTGNcm2dGL7NysJasMXW1FROSQ2mO7fXB91gCg7iC11cnvZAWTbRLPxYlJK6wpQ9HXCvWITbdBaG2GwBZgEqnPLqEVIgK4H2UbQGLnO2AzBlgDl8EVvdwATaffgMKE7ImeLAOkWN9EyhnZqZzUNpiRDAWAt8e/tCGDeIeXbfmrM9Hdjg4wE7g7fYAHmqzokwJLwRQt/54utDdIE52yjUlpl1TiAIHymDl9UG+i10pbej0ZOtmHVNhJs5eGLzDRGtkxbzTFGcMHxNQDJSTF8sWUJ5tPgfJpK/yvE6MvY5FXbA5TCFzSgv4thIkmRJ0ow7ritJUjspwiK8MWuVLSwrdXkVVMBJPYAWxEASMMXOwLoc98et4qoxC+qjTBgAYr9rxy+2MkwQVTHVDksZBC1FJtmDsaLsXys7XZskNJaL2QU7ttygBqme2BA9HQXS1VU0SavqAYrsm8vu/6XZvpjMF7MSxqjEsA0UJwNF2PTzYAaB7xD/0tHRKG3mZgAuqhoQjIBnr0TWzbRAItNI4Uv/G0teCVacNCYpzlozNi2LgAV4Yvt2yBRTkodlqIOAP1mEw5T/P6TbacRVJWmgw1myfbJYzBeHM/2d5Fm8Ma5Yzdnggmg5kkxfJEfWLKjlO2rdPKWqAEa35uYemC8EBmxiW5axNFUR8UhVNT5VrKGTaDIEbpM6zs7E+wlSAjpeEaOtiK4/Jf0WH9bCSoBopR7aOSoEtJiw/EO236t7dL/Nnj4wrPAZUcr/4FPSu0l6Ga9hRdDdiQ4AXG6AcvFmeAG0DdxtPWOduIKkLjJfq7haBu9jbq44ZYBGp6MJBUyMV3NBpPMwNXf5SRBKsKvGyaSzJ5TJ0NJ0BIUpU130u7eBkXakyouWZuBntHOFRztNF04S7DppNxRDdrVYm+36cjZBhNah6YZShJkDqJdJncJkoKv0/yktGnIu93Sit4yyod3B1k3zdyD/UVvG141S4BWL+jYPpmdussAdqo7fq0B7lSC+aYohnBF/mkVbVoDzA/FSgFOvh6g5StWtnMguK8ttkKLbV/fIEFKix/oY5JmBCVoFQ7ajg1a751vlDVNgZHsCodMhMSd6a1JsLxqTfBFXUtLOsCSb2v7V20wobVTbhg5dIl3fbENZgnZNMmOL2GnSYfTkiKtmumvGwedALIXPzOA7Dim7LhS/ok52rQSSZbZNkBxXUgzxyvNEbQ97Cm17rQDJEDfBqB4BpL3JevCstTp4dTZBqD/VSt6Ey37hQf1TCaN73/nX+2cKW8MfuH79gBG2/eqVfXARSYVpUjw/e+R532/4CDJNWZIaWIB0o0RX8k9hvYENQRjAfLdzztVO0vaRdHN5A6wKR/r+G2CEzLH5i11DTRAn13QuKuu34l2SYwS9NEAW9KbD/+CKAtH5Gj3tSFnsR0kQCPJVmzQ89g2MOPaET9Njw540d8+TCSJ7eQz72vDr0Mi/nrlP5E6EUpFbTZOU1vcs7g6b6dpD2mDxOU84H8p7WjbFzHRfuOKvsAm+sl/I/iCrjqn3WUtX+5VU7Jp/6SLtL/Kq6agbTozLdM2tC97VAPIT0eqwGY1gJQ0GtAkXdm9HRVNi+4nf3F1yVbSE0IGs+UmfXP+uXMxVTBSQYK9+SQ9ZGm8We4PSCltCZuVAPakSc75BXt/puow0SD+/BmWPZmi2YRVV1DRFX85UNxycuGT6hKM8aXlZhXQ/xe91DloyaY7QM2ZeeNZxV605ZPZuQJgnPYcOnATQK2K9jdqgFSM3PnjJsGmdAu7sJrwFgNLNrG3khUluDrQb/ROrlPGlasEWOZMoLcN2o1mjgAHXslOdgbR1QaXunLTzMr6BR0XFY0ODJ7FPXcbvCgr1xMuxbTeuGej3LdG1+k+ws+nlODMADALWrrva0PIPr9iW+9jGDScAPZr5QBp014j2WTlOgDsIwByR5/tVG3PUG6SUR3TVjJCaRgpmclcKKuVW3plC5CSrEzlJpkLq5WHNcBGpICjYGRpCTCZbO+VAsxkm721jli2agCWKDe3QnGqdv6suLs7sp9s+8VSxs/nWTXZT/wWVYzjwSjBwpNkAWvzxqNYIaPeUmbkxv5Ein0Z4Hoakebq+gCK0vuBB+ibABY4avQlgBu+nJhJsl1bnEjBSJYSQHr0HCWJwPFbtaSvwa/+bVf0U6iiC5LRSjfRsAvqbVb0Z9CHL1yhsYDGODOy6Q6QHdyUwVgJJBdAlTz82YaMRJwLevAdC+ESU/rT3MIdZO35WYJe9FYk6cMOdooEqDs0ZSD2b+u83NQC0M4/a9cWvP34GtRy7MmqZON0km5MOBYnXOnZ35nynBCkDWbJwqvW8USTB64FsvQEgPHc1M5tmPdVyccSzCh7wPw3FmfJ2wKkCNWdQVxpjtBLENo5fqVZ9xqcBzgF5r8hMpvahYzUjIg5ELx/bST6ZFo/gCoprkQpX8jMRIDeD0B7DWy8gy7X1wEkuie5nFh1HYG2MQAAvan2rHuN6146FWYl0sJDQNYmNvO2JXYqGqvSNVAlj58HS/VkDQB6uWcR6bGM4JRmItAKBwDQzxFks3ytbRt8kQ6kYxck0FpYd8d/qRkBFoIvB3DEP8poo+JcAO2StY6ARB5s6fNkJ3SrcCY3XyHaONX3PBFGvvtw9SxtWIgsohH28UF4n06c1rO+v7p5hgBrTH+tgsuFK4Ser1etaLaEKpp0pVgJEjnKjXhyhriBgn62ygGqToUh5nLZOGThc5ZrMTd5S65WtVRN3vu0kyClVTnzPa/QpM0mWoIOAPnxniVLcO5MsQaYuIAUxUlumyEinpRVDeHiBpjWswlgLT1bzSE0OSwKrADwPMqiBgiPpT3ARtohGLwp576lDbKMn51WrhflPuFsIn3ODjH6PU/h1Act3XNQUUqbHykiCS7P8A2J6LCI016Owun3EkdHjgB9n1+RpFNRb9HAs+kMsNHyF6WqNHQHKF2hUQD4I8KzmZK4AIxJohOoQkCkIzcb5LTXnj4scmyO58vFWdsgl/3SUxkj/X+/igRpUt6OmKQ1XoKZzOA3m6Dmfl6/CHAzqAiw5ZNBR62iN8SeTXeADRJd1KAxUjPZVzONVlFGu78oqsgeX47Z3chRUks5QErSH/Jj8ZgS7bdwxSFGqNkaFL0YDkjLhc0C0zYAaRrcXGwOzmrj59v5foRtLwRAGsWYDW+fx7Wzg80FPfyj5cBmTPI/Z0wKNyV+Yj4AAAAASUVORK5CYII="
                  height="40px"
                />
              </td>
              <td>{orders.totalAmount || "0"}</td>
              <td>{orders.status || "Pending"}</td>

              <td>
                <button
                  onClick={() => handleDelete(orders._id)}
                  className="delete-btn"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Order;
