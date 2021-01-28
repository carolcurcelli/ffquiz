import Head from 'next/head';
import db from '../../../db.json';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>{db.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:description" content={db.description} />
        <meta property="og:title" content={db.title} />
        <meta property="og:site_name" content={db.title} />
        <meta property="og:url" content={db.siteURL} />
        <meta property="og:image" content={db.bg} />
        <meta property="og:type" content="website" />
      </Head>
    </div>
  )
}

export default IndexPage