import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function DeleteItem(props) {
  let history = useHistory();
  useEffect(() => {
    axios
      .get(
        "https://inventorybackend.herokuapp.com/inventory/delete/" +
          props.match.params.id
      )
      .then((response) => {
        history.push({ pathname: "/", toastVisibilityForDelete: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div></div>;
}
