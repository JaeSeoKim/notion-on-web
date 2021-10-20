import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import { htmlLang, googleAnalyticsTrackingId } from "../lib/util/config"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang={htmlLang}>
        <Head>
          {googleAnalyticsTrackingId && (
            <>
              {/* Global site tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingId}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${googleAnalyticsTrackingId}');
                  `,
                }}
              ></script>
            </>
          )}
        </Head>
        <body>
          {/* No FLASH */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                // Change these if you use something different in your hook.
                var storageKey = 'them';
                var classNameDark = 'dark';
                var classNameLight = 'light';

                function setClassOnDocumentBody(darkMode) {
                  document.body.classList.add(darkMode ? classNameDark : classNameLight);
                  document.body.classList.remove(darkMode ? classNameLight : classNameDark);
                }

                var preferDarkQuery = '(prefers-color-scheme: dark)';
                var mql = window.matchMedia(preferDarkQuery);
                var supportsColorSchemeQuery = mql.media === preferDarkQuery;
                var localStorageTheme = null;
                try {
                  localStorageTheme = localStorage.getItem(storageKey);
                } catch (err) {}
                var localStorageExists = localStorageTheme !== null;
                if (localStorageExists) {
                  localStorageTheme = JSON.parse(localStorageTheme);
                }

                // Determine the source of truth
                if (localStorageExists) {
                  // source of truth from localStorage
                  setClassOnDocumentBody(localStorageTheme);
                } else if (supportsColorSchemeQuery) {
                  // source of truth from system
                  setClassOnDocumentBody(mql.matches);
                  localStorage.setItem(storageKey, mql.matches);
                } else {
                  // source of truth from document.body
                  var isDarkMode = document.body.classList.contains(classNameDark);
                  localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
                }
              })();
          `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
