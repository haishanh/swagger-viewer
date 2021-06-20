import Head from 'next/head';

const ogImageUrl =
  'https://repository-images.githubusercontent.com/196245690/b79fb280-58db-11ea-92b1-12f9f0132d03';

export function Og(props: { title?: string; ogImageUrl?: string }) {
  return (
    <Head>
      <title>{props.title || 'Swagger Viewer'}</title>
      <link rel="icon" href="/sw144.png" sizes="144x144" />
      <meta name="application-name" content="Swagger Viewer" />
      <meta name="description" content="Swagger Viewer" />
      <meta name="theme-color" content="#202020" />
      <meta property="og:image" content={props.ogImageUrl || ogImageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Swagger Viewer" />
      <meta property="og:url" content="https://swagger-viewer.now.sh" />
      <meta
        property="og:description"
        content="View your swagger spec in an organized way."
      />
    </Head>
  );
}
