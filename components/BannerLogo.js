import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {
  MDBBtn
} from 'mdb-react-ui-kit';

export default function BannerLogo() {
  return (
    <>
      <div
        className='p-5 text-center bg-image shadow-md'
        style={{ backgroundImage: "url('https://images.pexels.com/photos/2942855/pexels-photo-2942855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", height: '400px' }}
      >
        <div className='mask' style={{ backgroundColor: '#bdc3c787' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>
                <span className="special" style={{ textAlign: "center", color: "white", borderRadius: "20px 20px", padding: "2px 4px", backgroundColor: 'rgb(0 0 0 / 12%)' }}>
                  Nury Valenzuela.
                </span>
              </h1>
              <h5 className="mb-4" style={{ textAlign: "center", color: "white", borderRadius: "20px 20px", padding: "2px 4px", backgroundColor: 'rgb(0 0 0 / 12%)' }}>
                Los mejores productos y la mejor calidad.
              </h5>
              <MDBBtn tag="a" href='/shop' rel="noopener noreferrer" role="button" className='btn btn-secondary' size="lg">
                Compra Ahora.
              </MDBBtn>
              <MDBBtn tag="a" href="#shop" rel="noopener noreferrer" role="button" className='btn btn-secondary' size="lg">
                <i className="fa-solid fa-chevron-down"></i>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
