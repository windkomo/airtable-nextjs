import React from 'react';
import Head from 'next/head';
import Airtable from 'airtable';

export async function getStaticProps() {
  const airtable = new Airtable({
    apiKey: 'AIRTABLE_ACCOUNT_API_KEY',
  });

  const records = await airtable
    .base('AIRTABLE_BASE_ID')('Furniture')
    .select({
      fields: ['Name', 'Type', 'Images', 'Unit cost'],
    })
    .all();

  const products = records.map((product) => {
    return {
      name: product.get('Name'),
      type: product.get('Type'),
      images: product.get('Images').map((image) => image.url),
      cost: product.get('Unit cost'),
    };
  });

  return {
    props: {
      products,
    },
  };
}

function Product({ name, type, images, cost }) {
  return (
    <div style={{ padding: '32px' }}>
      <div>
        <b>{name}</b>
      </div>
      <div>{type}</div>
      {images.map((image) => (
        <img style={{ maxWidth: 200 }} key={image} src={image} alt={name} />
      ))}
      <div>${cost}</div>
    </div>
  );
}

function Home({ products }) {
  return (
    <div>
      <h1 className="title">Airtable Next.js example</h1>

      <div>
        {products.map((product) => (
          <Product
            key={product.name}
            name={product.name}
            type={product.type}
            images={product.images}
            cost={product.cost}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
