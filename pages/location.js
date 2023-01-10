import React from 'react';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Iframe from 'react-iframe';

export default function LocationScreen() {
  return (
    <Layout title="Contactos.">
      <main className="mt-5">
        <div className="container">
          {/*Section: Content*/}
          <section>
            <div className="row">
              <div className="col-md-12 gx-5 mb-4">
                <hr className="my-10" />
                <div className="page-header black-overlay">
                  <div className="container breadcrumb-section">
                    <div className="row pad-s15">
                      <>
                        <h2>
                          <FontAwesomeIcon icon="fa-solid fa-location-dot" /> CONTACTOS.
                        </h2>
                        <p>
                          <span className="rounded-icon">
                            MI CORREO ES. :* <a
                              href="mailto:nuryvalenzuelajoyeria@gmail.com"
                              rel="noopener noreferrer"
                              className="text-muted">
                              <>
                                <i className="fab fa-telegram"></i> nuryvalenzuelajoyeria@gmail.com
                              </>
                            </a>
                          </span>
                        </p>
                      </>
                    </div>
                  </div>
                </div>
                <hr className="my-10" />
                <section className="page_single padTB100">
                  <div className="container">
                    <div className="row pad-s15">
                      <div id="faqs-accordion" className="faqs-accordion">
                        <h3>
                          <div>
                            <span className="rounded-icon">
                              <i className="fa fa-map-marker" />
                            </span> Villavicencio, Meta, América Del Sur.
                          </div>
                          <div>
                            <span className="rounded-icon">
                              <i className="fa fa-map-marker" />
                            </span> Dirección: MonteArroyo Reservados 2 (Casa 6 Manzana 3).
                          </div>
                        </h3>
                        <div>
                          <a href="https://api.whatsapp.com/send?phone=573133966349&text=Hola%2C%20vengo%20desde%20tu%20perfil%20de%20Instagram%20y%20deseo%20obtener%20mas%20informaci%C3%B3n%20%20%F0%9F%92%8E" target="_blank" rel="noopener noreferrer" className="text-muted linkEnlace">
                            <i className="fab fa-whatsapp" style={{ fontSize: "25px", color: "#008000" }}></i> WhatsAPP.
                          </a>
                        </div>
                        <div>
                          <a href="https://www.instagram.com/nuryvalenzuelajoyeria/" target="_blank" rel="noopener noreferrer" className="text-muted linkEnlace">
                            <i className="fab fa-instagram" style={{ fontSize: "25px", color: "#C13584" }}></i> Instagram.
                          </a>
                        </div>
                        <div>
                          <a href="https://www.youtube.com/embed/lUIAHkN8TlQ" target="_blank" rel="noopener noreferrer" className="text-muted linkEnlace">
                            <i className="fab fa-youtube" style={{ fontSize: "25px", color: "#FD1D1D" }}></i> Youtube.
                          </a>
                        </div>
                        <hr className="my-10" />
                        <div>
                          <div>
                            <Iframe
                              width="110%" height="600px" border={0}
                              display="block"
                              position="relative"
                              id="gmap_canvas"
                              url="https://maps.google.com/maps?q=Condominio%20montearroyo%20recervado&t=&z=13&ie=UTF8&iwloc=&output=embed"
                              frameBorder={0}
                              scrolling="no"
                              marginHeight={0}
                              marginWidth={0}
                              allowfullscreen=""
                              loading="lazy"
                              referrerpolicy="no-referrer-when-downgrade"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                              className="border border-dark mx-auto d-block mb-4"
                            />
                          </div>
                        </div>
                        <hr className="my-10" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
          {/*Section: Content*/}
        </div>
      </main>
    </Layout>
  );
}
