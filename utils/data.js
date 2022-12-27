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
      email: 'marianauser123@example.com',
      password: bcrypt.hashSync('abc123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Anillo corazón Reborde',
      slug: 'anillo-corazon-reborde',
      category: 'Mujeres',
      image: '/images/IMG_6751.jpg',
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
      image: '/images/IMG_5610 - IMG_5615.png',
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
      image: '/images/IMG_5619 - IMG_5620 - IMG_5621.png',
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
      image: '/images/IMG_5587.jpg',
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
      image: '/images/20210222_160614.jpg',
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
      image: '/images/IMG_5154 - IMG_8130 - IMG_023134 - IMG_7885 - IMG_8198.png',
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