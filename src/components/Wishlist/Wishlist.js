import styles from "../Services/Services.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import pic1 from "../Services/pic1.jpg";
import modeContext from "../modeContext";

function Wishlist() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [render, setRender] = useState(true);
  const color = useContext(modeContext);
  const params = useParams();
  const uid = params.uid;
  function handleDeleteFromWishlist(id) {
    axios
      .delete("http://localhost:4000/wishlist/" + id)
      .then((res) => {
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    const id = 1;
    axios
      .get(
        "http://localhost:4000/wishlist?_expand=service&_expand=user&userId=" +
          uid
      )
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [render]);

  return (
    <div
      className={`${styles.serviceDiv} ${color ? styles.true : styles.false}`}
    >
      {data &&
        data.map((data) => (
          <Link>
            <div className={styles.service}>
              <div className={styles.imageSection}>
                <img className={styles.image} src={pic1} />
              </div>
              <div className={styles.description}>
                <div className={styles.header}>
                  <div className={styles.title}>{data.service.title}</div>
                </div>
                <div className={styles.separator}></div>

                <div className={styles.body}>
                  <div className={styles.subbody}>
                    <img
                      src={pic1}
                      alt=""
                      srcset=""
                      className={styles.userImage}
                    />
                    <div className={styles.userName}>{data.user.userName}</div>
                  </div>
                </div>
                <div className={styles.separator}></div>
                <div className={styles.price}>
                  Starting from {data.service.price}\-
                </div>
                {/* <div className={styles.separator}></div> */}
                <div className={styles.footer}>
                  <div>
                    <Link to={`/service/${data.service.id}`}> 🔎</Link>
                  </div>
                  <div>
                    <Link
                      onClick={() => {
                        handleDeleteFromWishlist(data.id);
                      }}
                    >
                      ❌
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Wishlist;
