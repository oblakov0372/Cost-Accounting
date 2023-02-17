import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import deletePng from "../../assets/delete.png";
import { deleteCost } from "../../redux/slices/cost";
import { ICost } from "../../types/cost";
import { deleteRequest } from "../../utils/requests";
const Item = ({ id, category, price, comment, date, categoryId }: any) => {
  const dispatach = useDispatch();

  const onClickDelete = async (cost: ICost) => {
    const status = await deleteRequest(`Costs/DeleteCost?id=${id}`);
    if (status === 200) {
      dispatach(deleteCost(cost));
    }
  };

  return (
    <Row className="mt-10">
      <Col className="p-0">{category}</Col>
      <Col className="p-0">${price}</Col>
      <Col className="p-0">{comment}</Col>
      <Col className="p-0">{date}</Col>
      <Col className="p-0">
        <img
          className="cursor-pointer"
          src={deletePng}
          onClick={() =>
            onClickDelete({ id, categoryId, price, comment, date })
          }
          alt="delte"
          width={40}
        />
      </Col>
    </Row>
  );
};

export default Item;
