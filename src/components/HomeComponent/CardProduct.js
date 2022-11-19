import React from "react";
import { Link } from "react-router-dom";
import homeStyle from "../../pages/Home/Home.module.css";

function Card(product) {
  return (
    <>
      <div className="row mt-3">
        {product?.data?.map((item) => (
          <div className="col-xl-2 mt-xl-4 col-md-3 mt-md-3">
            <div className={`card h-100`} role="presentation">
              <Link to={`/detail/${item?.id}`}>
                <img src={item?.image} alt="product" />
              </Link>
              <div className="card-body">
                <h5 className={`${homeStyle.titleProduct} text-start`}>
                  {item?.name}
                </h5>
                <p className="card-text mb-1">
                  Rp. <span>{item?.sell_price}</span>
                </p>
                <p className="text-muted mb-1">
                  Stock: <span>{item?.stock}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
