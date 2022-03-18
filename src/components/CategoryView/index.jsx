import { CssBaseline, Grid, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import Product from "../Product";
import Spinner from "../Spinner";
import "./style.css";

const CategoryView = ({ addProduct }) => {  
  const [products, setProducts] = useState({});
  const [category, setCategory] = useState({});

  
  const fetchCategory = async (slug) => {
    const category = await commerce.categories.retrieve(slug, { type: 'slug' });
  
  setCategory(category);
  }
  
  const fetchProduct = async (slug) => {
    const { data: productsData } = await commerce.products.list({
      category_slug: [slug],
    });
    const productsPerCategory = productsData.reduce((acc, product) => {
    return [
      ...acc,
      {
        ...product,
      },
    ];
  }, []);
  
  setProducts(productsPerCategory);
  }

  useEffect(() => {
    const slug = window.location.pathname.split("/");
    fetchProduct(slug[2]);
    fetchCategory(slug[2]);
  }, []);

  // console.log(products)
  // console.log(category)

  if (!products.length) return <Spinner />;

  return (
    <div>
      <CssBaseline />
      <Container id="products">
      <Link className="headline" to={`/`}>
        <Typography className="headline" variant="h3" component="h2">
          {category.name}
        </Typography>
      </Link>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Product product={product} addProduct={addProduct} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CategoryView;