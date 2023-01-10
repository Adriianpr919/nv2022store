import React from 'react';
import Layout from '../components/Layout';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function FaqScreen() {
  return (
    <Layout title="Preguntas Frecuentes.">
      <main className="mt-5">
        <div className="container">
          {/*Section: Content*/}
          <section>
            <div className="row">
              <div className="col-md-12 gx-5 mb-4">
                <hr className="my-10" />
                <>
                  <h4 className="title">Preguntas Frecuentes.</h4>
                  <div style={{ textAlign: "justify" }} lang="es">
                    <Tabs>
                      <TabList>
                        <Tab>
                          <i className="fas fa-info-circle" style={{ fontSize: "25px", color: "#2d3436" }}></i> ¿Quien fabrican una joya a mi gusto, ustedes lo hacen?
                        </Tab><br />

                        <Tab>
                          <i className="fas fa-info-circle" style={{ fontSize: "25px", color: "#2d3436" }}></i> ¿El precio de las argollas expuestos en la página web son por unidad o por el par?
                        </Tab><br />

                        <Tab>
                          <i className="fas fa-info-circle" style={{ fontSize: "25px", color: "#2d3436" }}></i> ¿Qué hago si no sé cuál es mi talla?
                        </Tab><br />

                        <Tab>
                          <i className="fas fa-info-circle" style={{ fontSize: "25px", color: "#2d3436" }}></i> ¿Si el producto no este disponible en el color que quiero, ustedes lo fabrican?
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <div style={{ textAlign: "justify" }}>
                          Diseños anillos y dijes a tu gusto. Debe acercarte a uno de nuestros puntos de ventas donde tengo habilitado el servicio técnico de joyería y solicitar una cotización de acuerdo a tu preferencia.
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div style={{ textAlign: "justify" }}>
                          El precio de las argollas son por unidad o par? El precio publicados en las argollas son por unidad. Recuerda que nuestros diseños son exclusivos, de alta calidad y garantizamos nuestro oro de 18 Kilates.
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div style={{ textAlign: "justify" }}>
                          En nuestras página web hemos dispuesto un &#34;PRODUCTO DE Anillos corazón Reborde&#34;. Ingrese a este opciones y sigue los sencillos pasos que se te indican. Así podrás conocer de forma rápida la talla que se ajusta a tus necesidades.
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div style={{ textAlign: "justify" }}>
                          Si, puedo escribirnos por la linea Whatsapp y iniciaremos la fabrican una vez se confirme la compra.
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </>
                <hr className="my-10" />
              </div>
            </div>
          </section>
          {/*Section: Content*/}
        </div>
      </main>
    </Layout>
  );
}
