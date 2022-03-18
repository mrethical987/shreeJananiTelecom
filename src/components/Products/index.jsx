import { Grid, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Product from "../Product";
import Spinner from "../Spinner";
import Banner from "../Banner";
import "./style.css";

const Products = ({ categories, addProduct }) => {
  if (!categories.length) return <Spinner />;
  
  // console.log(categories)

  return (
    <div>
      <Banner />
      <div id="products">
        {categories.map((category, index) =>
          category.productsData.length ? (
            <div
              key={category.id}
              className="contents"
              style={{
                backgroundImage:
                  index % 2 !== 0
                    ? "linear-gradient(to bottom right, #3d4a5d,#3d4a5d, #bb86fc)"
                    : "",
              }}
            >
              <Container>
                <Link className="headline" to={`category-view/${ category.slug }`}>
                  <Typography className="headline" variant="h3" component="h2">
                    {category.name}
                  </Typography>
                </Link>
                <Grid container spacing={4}>
                  {category.productsData.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                      <Product
                        product={product}
                        addProduct={addProduct}
                        categoryName={category.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
export default Products;
