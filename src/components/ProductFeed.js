import Product from "./Product";

export default function ProductFeed({products}) {
  return (
    <div className=" grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      { products.slice(0, 4).map(({ image, description, category, price, title, id}) => 
    <Product key={id} 
    image={image} 
    description={description}
    category={category}
    price={price}
    title={title}
    id={id}
    />)}
    <img className="md:col-span-full"
    src="https://links.papareact.com/dyz" 
    alt=""
    />
    <div className="md:col-span-2">

     { products.slice(4, 5).map(({ image, description, category, price, title, id}) => 
    <Product key={id} 
    image={image} 
    description={description}
    category={category}
    price={price}
    title={title}
    id={id}
    />)}
    </div>
    { products.slice(5, products.length).map(({ image, description, category, price, title, id}) => 
    <Product key={id} 
    image={image} 
    description={description}
    category={category}
    price={price}
    title={title}
    id={id}
    />)}
    </div>
  )
}
