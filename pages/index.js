
import data from '../utils/data';
import Layout from '../components/Layout';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ProductItem from '../components/ProductItem';

export default function Home() {
  return (
    <Layout title="Página De Inicio.">
      <h2 className="h2 my-4" id='shop'>PRODUCTOS DESTACADOS.</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}
