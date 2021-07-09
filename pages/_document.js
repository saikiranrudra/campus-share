import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../src/theme";
const cloudinary = require("cloudinary").v2;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="description"
            content="An Inter Campus Delivery Service Platform where user can get their items deliveried within the campus and user can even make money by delivering other user items"
          />
          <meta
            name="keywords"
            content="student, college, university, campus, delivery, money, speed delivery, connectivity"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body style={{ maxWidth: "1920px" }}>
          <Main />
          <NextScript />
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#fff",
              color: "#222F3E",
              marginTop: "1rem",
            }}
          >
            Made with ❤ by{" "}
            <a href="https://github.com/saikiranrudra">Saikiran Rudra</a>
          </div>
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
