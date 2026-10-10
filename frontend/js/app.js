let selectedSymbol = "";

const $ = id => document.getElementById(id);

const money = n =>
  "₹" +
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");

  setTimeout(() => {
    $("toast").classList.remove("show");
  }, 2600);
}


/* =========================================================
   AUTH
   ========================================================= */

function showAuth(mode) {
  $("loginForm").classList.toggle("hidden", mode !== "login");
  $("registerForm").classList.toggle("hidden", mode !== "register");

  $("loginTab").classList.toggle("active", mode === "login");
  $("registerTab").classList.toggle("active", mode === "register");
}

function showApp() {
  $("authView").classList.add("hidden");
  $("appView").classList.remove("hidden");

  loadAll();
}

function logout() {
  localStorage.removeItem("stock_token");
  localStorage.removeItem("stock_user");

  location.reload();
}


/* =========================================================
   FIXED POPULAR STOCK LIST
   20 INDIAN + 20 US COMPANIES
   ========================================================= */

const popularStocks = [

  // =========================
  // INDIAN COMPANIES
  // =========================

  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    market: "India"
  },

  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    market: "India"
  },

  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    market: "India"
  },

  {
    symbol: "INFY",
    name: "Infosys",
    market: "India"
  },

  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    market: "India"
  },

  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    market: "India"
  },

  {
    symbol: "SBIN",
    name: "State Bank of India",
    market: "India"
  },

  {
    symbol: "LICI",
    name: "Life Insurance Corporation",
    market: "India"
  },

  {
    symbol: "ITC",
    name: "ITC Limited",
    market: "India"
  },

  {
    symbol: "LT",
    name: "Larsen & Toubro",
    market: "India"
  },

  {
    symbol: "HCLTECH",
    name: "HCL Technologies",
    market: "India"
  },

  {
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    market: "India"
  },

  {
    symbol: "AXISBANK",
    name: "Axis Bank",
    market: "India"
  },

  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    market: "India"
  },

  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    market: "India"
  },

  {
    symbol: "TATAMOTORS",
    name: "Tata Motors",
    market: "India"
  },

  {
    symbol: "ASIANPAINT",
    name: "Asian Paints",
    market: "India"
  },

  {
    symbol: "WIPRO",
    name: "Wipro",
    market: "India"
  },

  {
    symbol: "TITAN",
    name: "Titan Company",
    market: "India"
  },

  {
    symbol: "ADANIENT",
    name: "Adani Enterprises",
    market: "India"
  },


  // =========================
  // US COMPANIES
  // =========================

  {
    symbol: "AAPL",
    name: "Apple",
    market: "USA"
  },

  {
    symbol: "MSFT",
    name: "Microsoft",
    market: "USA"
  },

  {
    symbol: "NVDA",
    name: "NVIDIA",
    market: "USA"
  },

  {
    symbol: "AMZN",
    name: "Amazon",
    market: "USA"
  },

  {
    symbol: "GOOGL",
    name: "Alphabet",
    market: "USA"
  },

  {
    symbol: "META",
    name: "Meta Platforms",
    market: "USA"
  },

  {
    symbol: "TSLA",
    name: "Tesla",
    market: "USA"
  },

  {
    symbol: "BRK.B",
    name: "Berkshire Hathaway",
    market: "USA"
  },

  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    market: "USA"
  },

  {
    symbol: "V",
    name: "Visa",
    market: "USA"
  },

  {
    symbol: "WMT",
    name: "Walmart",
    market: "USA"
  },

  {
    symbol: "MA",
    name: "Mastercard",
    market: "USA"
  },

  {
    symbol: "KO",
    name: "Coca-Cola",
    market: "USA"
  },

  {
    symbol: "NFLX",
    name: "Netflix",
    market: "USA"
  },

  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    market: "USA"
  },

  {
    symbol: "INTC",
    name: "Intel",
    market: "USA"
  },

  {
    symbol: "ADBE",
    name: "Adobe",
    market: "USA"
  },

  {
    symbol: "MCD",
    name: "McDonald's",
    market: "USA"
  },

  {
    symbol: "NKE",
    name: "Nike",
    market: "USA"
  },

  {
    symbol: "PEP",
    name: "PepsiCo",
    market: "USA"
  }

];


/* =========================================================
   POPULAR STOCKS DISPLAY
   ========================================================= */

function renderPopularStocks() {

  const container = $("popularStocks");

  if (!container) {
    return;
  }


  // Indian companies

  const indianStocks = popularStocks
    .filter(stock => stock.market === "India")
    .map(stock => `
      <button
        class="popular-stock"
        onclick="selectPopularStock('${stock.symbol}')">

        <strong>${stock.symbol}</strong>

        <span>${stock.name}</span>

        <small>India</small>

      </button>
    `)
    .join("");


  // US companies

  const usStocks = popularStocks
    .filter(stock => stock.market === "USA")
    .map(stock => `
      <button
        class="popular-stock"
        onclick="selectPopularStock('${stock.symbol}')">

        <strong>${stock.symbol}</strong>

        <span>${stock.name}</span>

        <small>USA</small>

      </button>
    `)
    .join("");


  container.innerHTML = `

    <div class="popular-header">

      <div>
        <h2>Popular Stocks</h2>
        <p class="muted">
          40 popular Indian and US companies
        </p>
      </div>

    </div>


    <div class="stock-section-title">
      🇮🇳 Indian Companies
    </div>

    <div class="popular-stock-grid">
      ${indianStocks}
    </div>


    <div class="stock-section-title">
      🇺🇸 US Companies
    </div>

    <div class="popular-stock-grid">
      ${usStocks}
    </div>

  `;
}


/* =========================================================
   SELECT POPULAR STOCK
   ========================================================= */

async function selectPopularStock(symbol) {

  $("symbolSearch").value = symbol;

  await searchQuote();

  const quotePanel = $("quotePanel");

  if (quotePanel) {

    quotePanel.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
}


/* =========================================================
   LOGIN
   ========================================================= */

async function login(e) {

  e.preventDefault();

  try {

    const data = await api("/auth/login", {

      method: "POST",

      body: JSON.stringify({
        email: $("loginEmail").value,
        password: $("loginPassword").value
      })

    });


    localStorage.setItem(
      "stock_token",
      data.access_token
    );

    localStorage.setItem(
      "stock_user",
      JSON.stringify(data.user)
    );


    showApp();

  }

  catch (err) {

    toast(err.message);

  }
}


/* =========================================================
   REGISTER
   ========================================================= */

async function register(e) {

  e.preventDefault();

  try {

    const data = await api("/auth/register", {

      method: "POST",

      body: JSON.stringify({

        name: $("registerName").value,

        email: $("registerEmail").value,

        password: $("registerPassword").value

      })

    });


    localStorage.setItem(
      "stock_token",
      data.access_token
    );

    localStorage.setItem(
      "stock_user",
      JSON.stringify(data.user)
    );


    showApp();

  }

  catch (err) {

    toast(err.message);

  }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

async function loadDashboard() {

  try {

    const [wallet, portfolio] =
      await Promise.all([

        api("/trading/wallet"),

        api("/portfolio")

      ]);


    // Account cards

    $("cashBalance").textContent =
      money(wallet.balance);

    $("portfolioValue").textContent =
      money(portfolio.total_market_value);

    $("investedValue").textContent =
      money(portfolio.total_invested);

    $("pnlValue").textContent =
      money(portfolio.total_profit_loss);


    $("pnlValue").className =
      portfolio.total_profit_loss >= 0
        ? "positive"
        : "negative";


    // Holdings

    const rows =
      portfolio.holdings || [];


    $("holdingsTable").innerHTML =
      rows.length

        ? `

          <table>

            <thead>

              <tr>

                <th>Symbol</th>

                <th>Qty</th>

                <th>Avg. Price</th>

                <th>Current</th>

                <th>Value</th>

                <th>P/L</th>

              </tr>

            </thead>


            <tbody>

              ${rows.map(x => `

                <tr>

                  <td>
                    <strong>${x.symbol}</strong>
                  </td>

                  <td>
                    ${x.quantity}
                  </td>

                  <td>
                    ${money(x.average_price)}
                  </td>

                  <td>
                    ${money(x.current_price)}
                  </td>

                  <td>
                    ${money(x.market_value)}
                  </td>

                  <td
                    class="${
                      x.profit_loss >= 0
                        ? "positive"
                        : "negative"
                    }">

                    ${money(x.profit_loss)}

                  </td>

                </tr>

              `).join("")}

            </tbody>

          </table>

        `

        : `

          <div class="empty">

            No holdings yet.
            Search a stock and place your
            first virtual trade.

          </div>

        `;


    // Popular stock list

    renderPopularStocks();

  }

  catch (err) {

    toast(err.message);

  }

}


/* =========================================================
   SEARCH STOCK
   ========================================================= */

async function searchQuote() {

  const symbol =
    $("symbolSearch")
      .value
      .trim()
      .toUpperCase();


  if (!symbol) {

    return toast(
      "Enter a stock symbol."
    );

  }


  try {

    const q = await api(
      `/stocks/quote/${encodeURIComponent(symbol)}`
    );


    selectedSymbol =
      q.symbol || symbol;


    $("quotePanel")
      .classList
      .remove("hidden");


    $("quoteSymbol")
      .textContent =
      selectedSymbol;


    $("quoteName")
      .textContent =
      q.name ||
      q.exchange ||
      "";


    $("quotePrice")
      .textContent =
      money(q.price);


    const change =
      Number(q.percent_change || 0);


    $("quoteChange")
      .textContent =
      `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;


    $("quoteChange").className =
      change >= 0
        ? "positive"
        : "negative";

  }

  catch (err) {

    toast(err.message);

  }

}


/* =========================================================
   BUY / SELL
   ========================================================= */

async function trade(type) {

  if (!selectedSymbol) {

    return toast(
      "Search a stock first."
    );

  }


  const quantity =
    Number(
      $("tradeQuantity").value
    );


  if (!quantity || quantity <= 0) {

    return toast(
      "Enter a valid quantity."
    );

  }


  try {

    const data =
      await api(`/trading/${type}`, {

        method: "POST",

        body: JSON.stringify({

          symbol: selectedSymbol,

          quantity: quantity

        })

      });


    toast(data.message);


    await loadAll();

  }

  catch (err) {

    toast(err.message);

  }

}


/* =========================================================
   WATCHLIST
   ========================================================= */

async function addWatchlist() {

  if (!selectedSymbol) {

    return toast(
      "Search a stock first."
    );

  }


  try {

    await api("/watchlist", {

      method: "POST",

      body: JSON.stringify({

        symbol: selectedSymbol

      })

    });


    toast(
      `${selectedSymbol} added to watchlist.`
    );


    loadWatchlist();

  }

  catch (err) {

    toast(err.message);

  }

}


/* =========================================================
   PORTFOLIO
   ========================================================= */

async function loadPortfolio() {

  const p =
    await api("/portfolio");


  $("portfolioTable").innerHTML =
    p.holdings.length

      ? `

        <table>

          <thead>

            <tr>

              <th>Symbol</th>

              <th>Quantity</th>

              <th>Average</th>

              <th>Current</th>

              <th>Market Value</th>

              <th>Profit/Loss</th>

            </tr>

          </thead>


          <tbody>

            ${p.holdings.map(x => `

              <tr>

                <td>
                  <strong>${x.symbol}</strong>
                </td>

                <td>
                  ${x.quantity}
                </td>

                <td>
                  ${money(x.average_price)}
                </td>

                <td>
                  ${money(x.current_price)}
                </td>

                <td>
                  ${money(x.market_value)}
                </td>

                <td
                  class="${
                    x.profit_loss >= 0
                      ? "positive"
                      : "negative"
                  }">

                  ${money(x.profit_loss)}

                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

      `

      : `

        <div class="empty">

          Your portfolio is empty.

        </div>

      `;

}


/* =========================================================
   TRANSACTIONS
   ========================================================= */

async function loadTransactions() {

  const data =
    await api("/transactions");


  $("transactionsTable").innerHTML =
    data.transactions.length

      ? `

        <table>

          <thead>

            <tr>

              <th>Date</th>

              <th>Type</th>

              <th>Symbol</th>

              <th>Quantity</th>

              <th>Price</th>

              <th>Total</th>

            </tr>

          </thead>


          <tbody>

            ${data.transactions.map(x => `

              <tr>

                <td>

                  ${
                    x.created_at
                      ? new Date(
                          x.created_at
                        ).toLocaleString()
                      : "-"
                  }

                </td>


                <td
                  class="${
                    x.type === "BUY"
                      ? "positive"
                      : "negative"
                  }">

                  <strong>
                    ${x.type}
                  </strong>

                </td>


                <td>
                  ${x.symbol}
                </td>


                <td>
                  ${x.quantity}
                </td>


                <td>
                  ${money(x.price)}
                </td>


                <td>
                  ${money(x.total)}
                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

      `

      : `

        <div class="empty">

          No transactions yet.

        </div>

      `;

}


/* =========================================================
   WATCHLIST PAGE
   ========================================================= */

async function loadWatchlist() {

  const data =
    await api("/watchlist");


  $("watchlistTable").innerHTML =
    data.watchlist.length

      ? `

        <table>

          <thead>

            <tr>

              <th>Symbol</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            ${data.watchlist.map(s => `

              <tr>

                <td>
                  <strong>${s}</strong>
                </td>


                <td>

                  <button
                    class="secondary"
                    onclick="quickQuote('${s}')">

                    View

                  </button>


                  <button
                    class="sell"
                    onclick="removeWatch('${s}')">

                    Remove

                  </button>

                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

      `

      : `

        <div class="empty">

          Your watchlist is empty.

        </div>

      `;

}


/* =========================================================
   QUICK QUOTE
   ========================================================= */

async function quickQuote(symbol) {

  $("symbolSearch").value =
    symbol;


  document
    .querySelector(
      '[data-page="dashboard"]'
    )
    .click();


  await searchQuote();

}


/* =========================================================
   REMOVE WATCHLIST
   ========================================================= */

async function removeWatch(symbol) {

  try {

    await api(
      `/watchlist/${symbol}`,
      {
        method: "DELETE"
      }
    );


    toast("Removed.");


    loadWatchlist();

  }

  catch (err) {

    toast(err.message);

  }

}


/* =========================================================
   LOAD EVERYTHING
   ========================================================= */

async function loadAll() {

  try {

    const user =
      JSON.parse(
        localStorage.getItem(
          "stock_user"
        ) || "{}"
      );


    $("userName").textContent =
      user.name || "";


    await loadDashboard();

  }

  catch (err) {

    localStorage.removeItem(
      "stock_token"
    );

    location.reload();

  }

}


/* =========================================================
   PAGE START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    // Login

    $("loginForm")
      .addEventListener(
        "submit",
        login
      );


    // Register

    $("registerForm")
      .addEventListener(
        "submit",
        register
      );


    // Logout

    $("logoutBtn")
      .addEventListener(
        "click",
        logout
      );


    // Search with Enter

    $("symbolSearch")
      .addEventListener(
        "keydown",
        e => {

          if (e.key === "Enter") {

            searchQuote();

          }

        }
      );


    // Navigation

    document
      .querySelectorAll(".nav-btn")
      .forEach(btn => {

        btn.addEventListener(
          "click",
          async () => {


            document
              .querySelectorAll(".nav-btn")
              .forEach(x =>
                x.classList.remove(
                  "active"
                )
              );


            btn.classList.add(
              "active"
            );


            document
              .querySelectorAll(".page")
              .forEach(x =>
                x.classList.add(
                  "hidden"
                )
              );


            const page =
              btn.dataset.page;


            $(`${page}Page`)
              .classList
              .remove("hidden");


            try {

              if (page === "dashboard") {

                await loadDashboard();

              }


              if (page === "portfolio") {

                await loadPortfolio();

              }


              if (page === "transactions") {

                await loadTransactions();

              }


              if (page === "watchlist") {

                await loadWatchlist();

              }

            }

            catch (err) {

              toast(err.message);

            }

          }
        );

      });


    // Automatically open application
    // if user is already logged in

    if (
      localStorage.getItem(
        "stock_token"
      )
    ) {

      showApp();

    }

  }
);