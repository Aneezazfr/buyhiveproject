import { IProduct } from "../Types/Product";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SearchCategory.css";

export const Products = (props: IProduct) => (
  <>
    <Col>
      <Card style={{ width: "18rem", minHeight: "300px", marginBottom: "3px" }}>
        <Card.Img
          variant="top"
          style={{ height: "220px" }}
          src={props.images}
        />
        <Card.Body style={{ minHeight: "214px" }}>
          <Card.Text className="text-truncate">
            Stock in: {props.stock_in}
          </Card.Text>
          <Card.Text className="text-truncate">{props.product_name}</Card.Text>
          <Card.Text className="text-muted">
            {" "}
            MOQ: {props.minimum_order_quantity} Pieces
          </Card.Text>
          <Card.Text className="" style={{ fontWeight: "bold" }}>
            $ {props.price} / piece
          </Card.Text>
          <button
            style={{ backgroundColor: "#00b2c9", borderColor: "#00b2c9" }}
            className="w-100 text-white rounded-2"
          >
            Add to Cart
          </button>
        </Card.Body>
      </Card>
    </Col>
  </>
);
