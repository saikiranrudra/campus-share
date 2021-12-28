import { useEffect, useState } from "react";
import campusShareAPI from "../../utils/Apis/campusShareAPI";
import Logger from "../../utils/Logger";
import Card from "../utils/Card";
import DeliveryCard from "./DeliveryCard";

const AcceptedDeliveries = ({ user }) => {
  const [orders, setOrders] = useState([]);

  const getAllDeliveris = () => {
    campusShareAPI
      .get("/api/delivery", {
        params: {
          deliveryPerson: user._id,
          status: "assigned"
        },
      })
      .then((res) => setOrders(res.data.data))
      .catch((err) => Logger.error(err));
  };

  useEffect(() => {
    getAllDeliveris();
  }, []);

  return (
    <Card title="Accepted Deliveries">
      {orders.map((order) => (
        <DeliveryCard
          user={user}
          key={order._id}
          delivery={order}
          getAllDeliveris={getAllDeliveris}
          isAcceptedOrder={true}
        />
      ))}
    </Card>
  );
};

export default AcceptedDeliveries;
