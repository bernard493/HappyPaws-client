import React from "react";
import "./RequestCard.scss";
import { Badge } from "@chakra-ui/react";
const RequestCard = ({ request }) => {
  const { name, orderNumber, price, offerPrice, shelterName, orderStatus } =
    request;
  return (
    <div className="request-card">
      <div className="request-card__order-container">
        <p>
          Order Number : <span className="request-card__order-text">{orderNumber}</span>
        </p>
        {orderStatus === "Approved" ? (
          <Badge variant="subtle" colorScheme="purple" fontSize="0.6rem">
            {orderStatus}
          </Badge>
        ) : orderStatus === "Canceled" ? (
          <Badge variant="subtle" colorScheme="red" fontSize="0.6rem">
            {orderStatus}
          </Badge>
        ) : orderStatus === "Completed" ? (
          <Badge variant="subtle" colorScheme="green" fontSize="0.6rem">
            {orderStatus}
          </Badge>
        ) : (
          <Badge fontSize="0.6rem">{orderStatus}</Badge>
        )}
      </div>
      <div className="request-card__detail-container">
        <div>
          <p>
            Pet Name : <span className="request-card__order-text">{name}</span>
          </p>
          <p>
            Shelter : <span className="request-card__order-text">{shelterName}</span>
          </p>
        </div>
        <div>
          <p>
            Price : <span className="request-card__order-text">£  {price}</span>
          </p>
          <p>
            Offer  : <span className="request-card__order-text">£  {offerPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
