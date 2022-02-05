import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternal({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQInternal.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternal);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((res) => res.json())
    .then((res) => res.data);

  const dadosDaPagina = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const foundQuestion = faqCategory.questions.find((question) => {
      if (question.slug === params.slug) {
        return true;
      }
      return false;
    });

    if (foundQuestion) {
      return {
        ...valorAcumulado,
        category: faqCategory,
        question: foundQuestion,
      };
    }

    return valorAcumulado;
  }, {});

  return {
    props: {
      category: dadosDaPagina.category,
      question: dadosDaPagina.question,
      pageWrapperProps: {
        seoPros: {
          headTitle: dadosDaPagina.question.title,
        },

      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((res) => res.json())
    .then((res) => res.data);

  const paths = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const questionsPath = faqCategory.questions.map((question) => ({
      params: { slug: question.slug },
    }));

    return [...valorAcumulado, ...questionsPath];
  }, []);

  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}
