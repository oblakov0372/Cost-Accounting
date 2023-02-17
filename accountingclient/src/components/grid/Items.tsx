import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format } from "date-fns";
import { ICost } from "../../types/cost";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ICategory } from "../../types/category";
import Item from "../item/Item";

const Items = ({ items }: any) => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  return (
    <Container className="m-0 ">
      <Row className="mt-10">
        <Col className="p-0">Category</Col>
        <Col className="p-0">Money</Col>
        <Col className="p-0">Comment</Col>
        <Col className="p-0">Date</Col>
        <Col className="p-0">Delete</Col>
      </Row>
      {items.map((item: ICost) => (
        <Item
          key={item.id}
          id={item.id}
          category={
            categories.find((obj: ICategory) => obj.id === item.categoryId)
              ?.name
          }
          price={item.price}
          comment={item.comment}
          date={item.date}
        />
      ))}
    </Container>
  );
};

export default Items;
