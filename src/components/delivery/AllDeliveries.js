import Card from "../utils/Card";
import DeliveryCard from "./DeliveryCard";

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
            isDeliveryPool={true}
          />
        ))}
      </Card>
    </>
  );
};

export default AllDeliveries;
