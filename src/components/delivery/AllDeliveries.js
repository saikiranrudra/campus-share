import Card from "../utils/Card";
import DeliveryCard from "./deliveryCard";

const AllDeliveries = ({deliveries = []}) => {
  return (
    <>
      <Card title="DELIVERIES POOL">
        {deliveries.map(delivery => <DeliveryCard delivery={delivery}/>)}
      </Card>
    </>
  );
};

export default AllDeliveries;
