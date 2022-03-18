import { CssBaseline, Grid, Button, Container, Typography } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";

import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = ({ addProduct }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    const { name, price, image, quantity, description } = response;
    setProduct({
      id,
      name,
      quantity,
      description,
      src: image.url,
      price: price.formatted_with_symbol,
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  // console.log(product)

  const handleQuantity = (param) => {
    if (param === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  console.log(product);

  return (
      <>
    <CssBaseline /><div className="single-product">
    <Container className="product-view">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4} className="image-wrapper">
          <img
            onLoad={() => {
              setLoading(false);
            }}
            src={product.src}
            alt={product.name}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8} className="text">
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="h3">Price :- {product.price}</Typography>
          <Grid>
            <Grid item xs={12} md={6} lg={4}  >
              <Typography className="quantity" variant="h3">
                Quantity :-
              </Typography>
            <Grid item xs={12} md={6} lg={2} className="quantity-item">
                <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                    handleQuantity("decrease");
                    }}
                >
                -
              </Button>
              <Typography className="quantity-item item" variant="h3">
                {quantity}
              </Typography>
              <Button
                size="small"
                variant="contained"
                className="increase-product-quantity"
                onClick={() => {
                  handleQuantity("increase");
                }}
              >
                +
              </Button>
              <Button
                className="quantity-item item cart"
                size="small"
                onClick={() => {
                  addProduct(product.id, quantity);
                }}
              >
                <AddShoppingCart />
              </Button>
            </Grid>
            </Grid>
            <Grid className="text">
                <Typography
                variant="body2"
                dangerouslySetInnerHTML={createMarkup(product.description)}
                />            
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {loading && <Spinner />}
    </Container>
    </div>
    </>
  );
};

export default ProductView;