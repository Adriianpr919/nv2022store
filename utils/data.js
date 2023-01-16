import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin123@example.com',
      password: bcrypt.hashSync('abc123456'),
      isAdmin: true,
    },
    {
      name: 'Mariana',
      email: 'marianauser123@example123.com',
      password: bcrypt.hashSync('abc123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Anillo corazón Reborde',
      slug: 'anillo-corazon-reborde',
      category: 'Mujeres',
      sizes: [
        {
          title: "4"
        },
        {
          title: "4.5"
        },
        {
          title: "5"
        },
        {
          title: "5.5"
        },
        {
          title: "6"
        },
        {
          title: "6.5"
        },
        {
          title: "7"
        },
        {
          title: "7.5"
        },
        {
          title: "8"
        },
        {
          title: "8.5"
        },
        {
          title: "9"
        },
      ],
      colorsOne: [
        {
          title: "Amarillo"
        },
        {
          title: "Rosado"
        },
        {
          title: "Blanco"
        },
      ],
      colorsTwo: [
        {
          title: "Azul Agua"
        },
        {
          title: "Rosa"
        },
        {
          title: "Fucsia"
        },
        {
          title: "Transparente"
        },
        {
          title: "Negro"
        },
        {
          title: "Lila"
        },
        {
          title: "Azul Oscuro"
        },
        {
          title: "Verde Manzana"
        },
        {
          title: "Verde Esmeralda"
        },
        {
          title: "Naranja"
        },
        {
          title: "Morado"
        },
        {
          title: "Multicolor"
        },
      ],
      image: '/images/products/IMG_6751.jpg',
      imageOne: '/images/products/IMG_3974.jpg',
      imageTwo: '/images/products/IMG_3973.jpg',
      imageThree: '/images/products/IMG_3972.jpg',
      imageFour: '/images/products/productsA5.png',
      imageFive: '/images/products/productsA6.png',
      imageSix: '/images/products/productsA7.png',
      imageSeven: '/images/products/productsA8.png',
      price: 3590000,
      brand: 'Destacados',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'Anillo elaborado en oro 18K con incrustaciones en circón natural.',
    },
    {
      name: 'Anillo Corazón Pendulo',
      slug: 'anillo-corazon-pendulo',
      category: 'Mujeres',
      sizes: [
        {
          title: "4"
        },
        {
          title: "4.5"
        },
        {
          title: "5"
        },
        {
          title: "5.5"
        },
        {
          title: "6"
        },
        {
          title: "6.5"
        },
        {
          title: "7"
        },
        {
          title: "7.5"
        },
        {
          title: "8"
        },
        {
          title: "8.5"
        },
        {
          title: "9"
        },
      ],
      colorsOne: [
        {
          title: "Amarillo"
        },
        {
          title: "Rosado"
        },
        {
          title: "Blanco"
        },
      ],
      colorsTwo: [
        {
          title: "Azul Agua"
        },
        {
          title: "Rosa"
        },
        {
          title: "Fucsia"
        },
        {
          title: "Transparente"
        },
        {
          title: "Negro"
        },
        {
          title: "Lila"
        },
        {
          title: "Azul Oscuro"
        },
        {
          title: "Verde Manzana"
        },
        {
          title: "Verde Esmeralda"
        },
        {
          title: "Naranja"
        },
        {
          title: "Morado"
        },
        {
          title: "Multicolor"
        },
      ],
      image: '/images/products/IMG_5615.jpg',
      imageOne: '/images/products/IMG_5610.jpg',
      imageTwo: '/images/products/IMG_5609.jpg',
      imageThree: '/images/products/productsA4.png',
      imageFour: '/images/products/productsA5.png',
      imageFive: '/images/products/productsA6.png',
      imageSix: '/images/products/productsA7.png',
      imageSeven: '/images/products/productsA8.png',
      price: 3490000,
      brand: 'Destacados',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'Anillo elaborado en oro 18K con incrustaciones en circón natural.',
    },
    {
      name: 'Anillo Ancho',
      slug: 'anillo-ancho',
      category: 'Mujeres',
      sizes: [
        {
          title: "4"
        },
        {
          title: "4.5"
        },
        {
          title: "5"
        },
        {
          title: "5.5"
        },
        {
          title: "6"
        },
        {
          title: "6.5"
        },
        {
          title: "7"
        },
        {
          title: "7.5"
        },
        {
          title: "8"
        },
        {
          title: "8.5"
        },
        {
          title: "9"
        },
      ],
      colorsOne: [
        {
          title: "Amarillo"
        },
        {
          title: "Rosado"
        },
        {
          title: "Blanco"
        },
      ],
      colorsTwo: [
        {
          title: "Azul Agua"
        },
        {
          title: "Rosa"
        },
        {
          title: "Fucsia"
        },
        {
          title: "Transparente"
        },
        {
          title: "Negro"
        },
        {
          title: "Lila"
        },
        {
          title: "Azul Oscuro"
        },
        {
          title: "Verde Manzana"
        },
        {
          title: "Verde Esmeralda"
        },
        {
          title: "Naranja"
        },
        {
          title: "Morado"
        },
        {
          title: "Multicolor"
        },
      ],
      image: '/images/products/IMG_5621.jpg',
      imageOne: '/images/products/IMG_5616.jpg',
      imageTwo: '/images/products/IMG_5619.jpg',
      imageThree: '/images/products/IMG_5620.jpg',
      imageFour: '/images/products/productsA5.png',
      imageFive: '/images/products/productsA6.png',
      imageSix: '/images/products/productsA7.png',
      imageSeven: '/images/products/productsA8.png',
      price: 3790000,
      brand: 'Destacados',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'Anillo elaborado en oro 18K con incrustaciones en circón natural.',
    },
    {
      name: 'Anillo Reborde',
      slug: 'anillo-reborde',
      category: 'Mujeres',
      sizes: [
        {
          title: "4"
        },
        {
          title: "4.5"
        },
        {
          title: "5"
        },
        {
          title: "5.5"
        },
        {
          title: "6"
        },
        {
          title: "6.5"
        },
        {
          title: "7"
        },
        {
          title: "7.5"
        },
        {
          title: "8"
        },
        {
          title: "8.5"
        },
        {
          title: "9"
        },
      ],
      colorsOne: [
        {
          title: "Amarillo"
        },
        {
          title: "Rosado"
        },
        {
          title: "Blanco"
        },
      ],
      colorsTwo: [
        {
          title: "Azul Agua"
        },
        {
          title: "Rosa"
        },
        {
          title: "Fucsia"
        },
        {
          title: "Transparente"
        },
        {
          title: "Negro"
        },
        {
          title: "Lila"
        },
        {
          title: "Azul Oscuro"
        },
        {
          title: "Verde Manzana"
        },
        {
          title: "Verde Esmeralda"
        },
        {
          title: "Naranja"
        },
        {
          title: "Morado"
        },
        {
          title: "Multicolor"
        },
      ],
      image: '/images/products/IMG_5590.jpg',
      imageOne: '/images/products/IMG_5587.jpg',
      imageTwo: '/images/products/productsA3.png',
      imageThree: '/images/products/productsA4.png',
      imageFour: '/images/products/productsA5.png',
      imageFive: '/images/products/productsA6.png',
      imageSix: '/images/products/productsA7.png',
      imageSeven: '/images/products/productsA8.png',
      price: 0,
      brand: 'Destacados',
      rating: 2.9,
      numReviews: 13,
      countInStock: 20,
      description: 'Anillo elaborado en oro 18K con incrustaciones en circón natural.',
    },
    {
      name: 'Dije Corazón Reborde',
      slug: 'dije-corazon-reborde',
      category: 'Mujeres',
      sizes: [
        {
          title: "Ninguno"
        }
      ],
      colorsOne: [
        {
          title: "Amarillo"
        },
        {
          title: "Rosado"
        },
        {
          title: "Blanco"
        },
      ],
      colorsTwo: [
        {
          title: "Azul Agua"
        },
        {
          title: "Rosa"
        },
        {
          title: "Fucsia"
        },
        {
          title: "Transparente"
        },
        {
          title: "Negro"
        },
        {
          title: "Lila"
        },
        {
          title: "Azul Oscuro"
        },
        {
          title: "Verde Manzana"
        },
        {
          title: "Verde Esmeralda"
        },
        {
          title: "Naranja"
        },
        {
          title: "Morado"
        },
        {
          title: "Multicolor"
        },
      ],
      image: '/images/products/IMG_5162.jpg',
      imageOne: '/images/products/20210222_160614.jpg',
      imageTwo: '/images/products/productsA3.png',
      imageThree: '/images/products/productsA4.png',
      imageFour: '/images/products/productsA5.png',
      imageFive: '/images/products/productsA6.png',
      imageSix: '/images/products/productsA7.png',
      imageSeven: '/images/products/productsA8.png',
      price: 2290000,
      brand: 'Destacados',
      rating: 2.4,
      numReviews: 14,
      countInStock: 20,
      description: 'Dije elaborado en oro 18K con incrustaciones en circón natural.',
    },
    {
      name: 'Dije Fe',
      slug: 'dije-fe',
      category: 'Mujeres',
      sizes: [
        {
          title: "Ninguno"
        }
      ],
      colorsOne: [
        {
          title: "Amarillo"
        },
        {
          title: "Rosado"
        },
        {
          title: "Blanco"
        },
      ],
      colorsTwo: [
        {
          title: "Azul Agua"
        },
        {
          title: "Rosa"
        },
        {
          title: "Fucsia"
        },
        {
          title: "Transparente"
        },
        {
          title: "Negro"
        },
        {
          title: "Lila"
        },
        {
          title: "Azul Oscuro"
        },
        {
          title: "Verde Manzana"
        },
        {
          title: "Verde Esmeralda"
        },
        {
          title: "Naranja"
        },
        {
          title: "Morado"
        },
        {
          title: "Multicolor"
        },
      ],
      image: '/images/products/IMG_4897.jpg',
      imageOne: '/images/products/IMG_5154.jpg',
      imageTwo: '/images/products/IMG_8130.jpg',
      imageThree: '/images/products/IMG_023134.jpg',
      imageFour: '/images/products/IMG_7885.jpg',
      imageFive: '/images/products/IMG_8198.jpg',
      imageSix: '/images/products/productsA7.png',
      imageSeven: '/images/products/productsA8.png',
      price: 3590000,
      brand: 'Destacados',
      rating: 3.5,
      numReviews: 7,
      countInStock: 20,
      description: 'Dije elaborado en oro 18K con turmalinas.',
    },
  ],
};

export default data;