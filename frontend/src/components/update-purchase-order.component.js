import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function UpdatePurchaseOrder(props) {
  let history = useHistory();
  useEffect(() => {
    const updatedItem = {
      order_status: 5,
    };
    console.log(props.match.params.id)
    axios
      .post(
        "https://inventorybackend.herokuapp.com/inventory/purchaseorders/update/" +
          props.match.params.id,
        updatedItem
      )
      .then((response) => {
        history.push({
          pathname: "/purchaseorders",
          toastVisibilityForDelete: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div></div>;
}
