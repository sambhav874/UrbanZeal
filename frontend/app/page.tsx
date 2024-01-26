// frontend/pages/Page.tsx

import Head from 'next/head';
import Link from 'next/link';
import { Container, Heading, Text } from '@chakra-ui/react';
import Navbar from '../components/navbar'

const Page = () => {
  return (
    <div className=" items-center  p-6 text-2xl">
      

      <main>
        <Navbar />
        <Heading as="h1" size="xl" color={"black"} my={6}>
          Welcome to UrbanZeal
        </Heading>
        <Text fontSize="lg" mb={6}>
          Explore our latest collection of clothing.
        </Text>
        
        <Link href="/products">
          View Products
        </Link>
      </main>
    </div>
  );
};

export default Page;
