/* eslint-disable react/prop-types */
import React from 'react';
import FAQScreen from '../../src/components/screens/FAQScreen';

export default function FAQPage({ faqCategories }) {
  return (
    <FAQScreen faqCategories={faqCategories} />
  );
}

export async function getStaticProps() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((result) => result.json())
    .then((result) => result.data);

  return {
    props: { faqCategories },
  };
}
