import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Global Group Executive</title>
          <meta
            property="og:title"
            content="test-page - Global Group Executive"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_kyslpb) => (
            <>
              <h1 id={context_kyslpb?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextKyslpbProp}
          persistDataDuringLoading={true}
          key={props?.contextKyslpbProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextKyslpbProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextKyslpbProp: contextKyslpbProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
