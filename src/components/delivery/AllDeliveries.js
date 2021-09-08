import Card from "../utils/Card";
import DeliveryCard from "./deliveryCard";

const AllDeliveries = ({ deliveries = [], getAllDeliveris, user }) => {
  return (
    <>
      <Card title="DELIVERIES POOL">
        {deliveries.map((delivery) => (
          <DeliveryCard
            key={delivery._id}
            delivery={delivery}
            getAllDeliveris={getAllDeliveris}
            user={user}
          />
        ))}
      </Card>
    </>
  );
};

export default AllDeliveries;
