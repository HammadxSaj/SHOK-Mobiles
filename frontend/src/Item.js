import React from 'react';
import { useParams } from 'react-router-dom';
import './Item.css';

// Import your images
import image1 from './fig1.jpeg';
import image2 from './fig2.jpeg';
import image3 from './fig3.jpeg';

const Item = () => {
  const { id } = useParams();

  // Assuming you have an array of image imports corresponding to each item ID
  const images = [image1, image2, image3];

  // Dummy data for details (replace with actual data from your API or wherever you fetch it)
  const itemDetails = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1 fsgaebrsbdafvsbfsagvs\bs', price: '$10.99' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2', price: '$19.99' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3', price: '$14.99' },
  ];

  // Validate if the ID is within the range of available images and details
  const isValidId = id >= 1 && id <= images.length && id <= itemDetails.length;

  return (
    <div className="item-details-container">
      {isValidId ? (
        <>
          <div className="image-container">
            <img src={images[id - 1]} alt={`Item ${id}`} />
          </div>
          <div className="details-container">
            <h1>{itemDetails[id - 1].name}</h1>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{itemDetails[id - 1].description}</td>
                  <td>{itemDetails[id - 1].price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Invalid item ID</p>
      )}
    </div>
  );
};

export default Item;
