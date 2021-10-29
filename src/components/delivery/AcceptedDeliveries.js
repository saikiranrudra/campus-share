import { useEffect, useState } from "react";
import campusShareAPI from "../../utils/Apis/campusShareAPI";
import Logger from "../../utils/Logger";
import Card from "../utils/Card";
import DeliveryCard from "./deliveryCard";

const AcceptedDeliveries = ({ user }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    campusShareAPI.get('/api/delivery', {
      params: {
        deliveryPerson: user._id
      }
    })
    .then(res => setOrders(res.data.data))
    .catch(err => Logger.error(err));
  }, [])

  return (
    <Card title="Accepted Deliveries">
      {orders.map(order => <DeliveryCard user={user} key={order._id} delivery={order} isAcceptedOrder={true} />)}
    </Card>
  );
};

export default AcceptedDeliveries;