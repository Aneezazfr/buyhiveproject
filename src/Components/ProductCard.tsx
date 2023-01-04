import { IProduct } from "../Types/Product";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SearchCategory.css";
import React from "react";

export const ProductCard = (props: IProduct) => (
  <>
    <Row>
      <Card
        style={{ width: "300rem", minHeight: "200px", marginBottom: "3px" }}
      >
        <div className="row">
          <div className="col-3 p-2">
            <Card.Img
              variant=""
              style={{ height: "180px" }}
              src={props.images}
            />
          </div>
          <div className="col-9">
            <Card.Body style={{ minHeight: "214px" }}>
              <Card.Text className="text-truncate">
                Stock in: {props.stock_in}
              </Card.Text>
              <Card.Text className="text-truncate">
                {props.product_name}
              </Card.Text>
              <Card.Text className="text-muted">
                {" "}
                MOQ: {props.minimum_order_quantity} Pieces
              </Card.Text>
              <Card.Text className="" style={{ fontWeight: "bold" }}>
                $ {props.price} / piece
              </Card.Text>
              <button
                style={{ backgroundColor: "#00b2c9", borderColor: "#00b2c9" }}
                className="w-25 text-white rounded-2"
              >
                Add to Cart
              </button>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Row>
  </>
);
