import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import Link from 'next/link';
import aboutA1 from '../public/images/aboutA1.jpg';
import aboutA2 from '../public/images/aboutA2.jpg';
import aboutA3 from '../public/images/aboutA3.jpg';
import aboutA4 from '../public/images/aboutA4.jpg';

export default function AboutScreen() {
  return (
    <Layout title="Quiénes Somos.">
      <main className="mt-5">
        <div className="container">
          {/*Section: Content*/}
          <section>
            <div className="row">
              <div className="col-md-12 gx-5 mb-4">
                <hr className="my-10" />
                <>
                  <div style={{ textAlign: "justify" }} lang="es">
                    <div className="contentStickyImage">
                      <div className="AbouTimg">
                        <Image src={aboutA1} className="img-responsive img-rounded mx-auto d-block img-thumbnail" alt="Nury Valenzuela." title="Nury Valenzuela." />
                      </div>
                      <div className="AbouTtext">
                        <h1 className="AbouTtitle">
                          <strong><span><b><em>QUIÉNES SOMOS</em></b></span></strong>
                        </h1>
                        <div className="about" style={{ textAlign: "justify" }}>
                          La imagen detrás de Nury Valenzuela, soy una mujer real motivada por el deseo de transmitir el arte a todos nuestros clientes.
                          <br />
                          Nuestro nacimiento e historia ha sido un camino lleno de amor y Fé en Dios a quien debo mi éxito y reconocimiento, Dios ha sido mi fuerza en cada decisión y paso que he dado, Él es el verdadero dueño de mi talento.
                          <br />
                          Las joyas que hoy se fabrican bajo mi nombre son el resultado de la disciplina y organización que me ha caracterizado desde muy corta edad, hoy puedo ser ejemplo para otras generaciones de que el trabajo incansable y honesto al final siempre da frutos, con Nury Valenzuela puedo ver materializado mis objetivos y el poder de Dios porque fue Él quien me llevó más lejos que mis propios sueños, es por eso que tengo claro que cada prueba que me ha puesto la vida me ha servido de inspiración para plasmar mis sentimientos en una joya de alta calidad.
                          <br />
                          Este mágico proyecto fue escrito y dedicado a Dios para que siempre hiciera Memoria delante de Él.
                        </div>
                        <h1 className="AbouTtitle">
                          <strong><span><b><em>Visión</em></b></span></strong>
                        </h1>
                        <div className="about" style={{ textAlign: "justify" }}>
                          Convertimos en una empresa reconocida a nivel internacional destacándonos por nuestros diseños y atención de calidad, logrando fortalecer en nuestros clientes su seguridad y autoestima.
                        </div>
                        <h1 className="AbouTtitle">
                          <strong><span><b><em>Misión</em></b></span></strong>
                        </h1>
                        <div className="about" style={{ textAlign: "justify" }}>
                          Somos una joyería colombiana, dedicada al diseño de calidad, innovador y elegante, con el propósito de resaltar la belleza de los hombres y mujeres que lucen nuestras piezas.
                        </div>
                      </div>
                    </div>
                    <div className="contentStickyImage">
                      <div className="AbouTimg">
                        <Image src={aboutA2} className="img-responsive img-rounded mx-auto d-block img-thumbnail" alt="Mariana Tamayo." title="Mariana Tamayo." />
                      </div>
                      <div className="AbouTtext">
                        <h1 className="AbouTtitle">
                          <strong><span><b><em>NUESTRO EQUIPO</em></b></span></strong>
                        </h1>
                        <div className="about" style={{ textAlign: "justify" }}>
                          Mi ejemplo ha determinado el futuro de mi hija quien es ahora mi mano derecha, ella adoptó este arte con todo su amor y decidió repartir sus días entre la vocación por la medicina y la joyería de alta calidad, ella es mi mejor equipo, mi inspiración y mi orgullo.
                          <br />
                          Hoy Nury Valenzuela es el reflejo del amor más real que existe. El amor entre una Madre y su hija, sin dejar de lado que este mágico proyecto será a mediano plazo un amor de tres.
                        </div>
                        <h2 className="AbouTsub-title">
                          <strong><span><b><em>EQUIPO</em></b></span></strong>
                        </h2>
                        <div className="AbouTimages">
                          <Link href="https://www.instagram.com/nuryval10/" target={"_blank"} rel="noopener noreferrer">
                            <div>
                              <Image src={aboutA3} className="img-responsive img-rounded mx-auto d-block img-thumbnail" alt="Nury Valenzuela." title="Nury Valenzuela." />
                            </div>
                          </Link>
                          <Link href="https://www.instagram.com/marianatamayov/" target={"_blank"} rel="noopener noreferrer">
                            <div>
                              <Image src={aboutA4} className="img-responsive img-rounded mx-auto d-block img-thumbnail" alt="Mariana Tamayo." title="Mariana Tamayo." />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
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
