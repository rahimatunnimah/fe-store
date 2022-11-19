import React from "react";
import { Link } from "react-router-dom";
function Card(product) {
  return (
    <>
      <div className="row mt-3">
        {product?.data?.map((item) => (
          <div className="col-xl-2 mt-xl-4 col-md-3 mt-md-3">
            <Link to={`/detail/${item?.id}`}>
              <div className={`card h-100`} role="presentation">
                <img src={item?.image} alt="product" />
                <div className="card-body">
                  <h5 className="card-title text-start">{item?.name}</h5>
                  <p className="card-text mb-1">{item?.sell_price}</p>
                  <p className="text-muted mb-1">{item?.stock}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
