import { CATEGORY_DEAL_URLS,
  REDIS_CACHE_URLS,
  SEARCHPANEL_OFFER_URL_DESKTOP,
  SEARCHPANEL_OFFER_URL_ADAPTIVE,
} from "./serverConsts"
// import { getCategoryDealSecton } from "dumbComponents/Common/CategoryDealSection/utils"

const getCategoryDealSecton = () => {}
export const getCategoryDealSectionName = (url, hostname) => {
  const urlArray = url.split("/")
  const length = urlArray.length
  const name = urlArray[length - 1]
  if (url === "/") {
    return getCategoryDealSecton("homepage", {}, hostname)
  } else if (CATEGORY_DEAL_URLS.indexOf(name) >= 0) {
    return getCategoryDealSecton(name, {}, hostname)
  }
  return ""
}

export const getRedisKey = (url, isMobile, hostname) => `${hostname}/${isMobile ? "mobile" : "desktop"}${url}`

//To Do: Temp blacklist.
export const isRedisRequiredforUrl = url =>
  REDIS_CACHE_URLS.indexOf(url) >= 0 && !REDIS_CACHE_URLS.indexOf("/hotels/") >= 0

export const getSearchpanelOfferName = (isMobile, url) => {
  if (isMobile) {
    return SEARCHPANEL_OFFER_URL_ADAPTIVE[url]
  }
  return SEARCHPANEL_OFFER_URL_DESKTOP[url]
}

export const getFileOpenFailedErrorPage = () => (
`  <html>
    <head>
      <title>Lifafa.com</title>
      <style>
      .body {
        margin: auto;
        text-align: center;
        color: #000;
      }
      .header {
        border-bottom: 1px solid #CCC;
        padding: 10px 15px 15px 0;
      }
      .logo_wrap {
        margin-left: 85px;
      }
      </style>
    </head>
    <body>
      <div class="main">
        <div class="header">
          <div class="logo_wrap">
            <img src="/lifafa_logo.png" alt="Lifafa Icon">
          </div>
          <div class="side_wrap">
          </div>
        </div>
        <div class="body">
          <h1>Oops! Internal Error </h1>
          <h2>
            Something Went Wrong.<br>
            There was a problem serving the required page.
          </h2>
          <h3>
            <a href="/">
              Go To Home
            </a>
          </h3>
          </div>
        </div>
        <div class="footer">
        </div>
      </div>
    </body>
  </html>
`
)
