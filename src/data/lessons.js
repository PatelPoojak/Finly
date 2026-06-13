// A short lesson for every topic, keyed by topic id. Each lesson is a list of
// blocks rendered by the Lesson page. Block shapes (one key each):
//   { h: "Subheading" }
//   { p: "Paragraph" }
//   { list: ["item", "item"] }
//   { term: "Term", def: "Definition" }
//   { callout: "A key takeaway worth highlighting" }

export const lessons = {
  // ----------------------- Personal Finance ------------------------------
  "pf-budgeting": {
    minutes: 3,
    blocks: [
      { p: "A budget is not about spending less. It is a plan that tells your money where to go before the month spends it for you." },
      { h: "The 50/30/20 starting point" },
      { p: "A simple, popular split is to send 50 percent of take home pay to needs, 30 percent to wants, and 20 percent to savings and extra debt payments. It is a starting frame, not a rule, and you can adjust the percentages to fit your life." },
      { term: "Needs vs wants", def: "Needs are things you must pay for to live and function, like rent, food, and transport. Wants are everything optional, like subscriptions and eating out." },
      { h: "Fixed vs variable" },
      { p: "Fixed costs stay the same each month (rent, insurance). Variable costs move with your choices (groceries, gas, fun). Variable costs are where you have the most control." },
      { callout: "Pay yourself first: treat savings like a bill you owe yourself, and set it aside before you start spending." },
    ],
  },
  "pf-saving": {
    minutes: 3,
    blocks: [
      { p: "Saving is what turns a surprise from a crisis into a minor annoyance. The first job of savings is not growth, it is safety." },
      { h: "The emergency fund" },
      { p: "An emergency fund is money set aside for unexpected costs like a car repair or a lost job. A common target is three to six months of essential expenses, kept somewhere safe and easy to reach." },
      { term: "High yield savings account", def: "A savings account that pays meaningfully more interest than a regular one, while keeping your money safe and accessible. A good home for an emergency fund." },
      { h: "Make it automatic" },
      { p: "The most reliable savers do not rely on willpower. They set up an automatic transfer on payday so saving happens before they can spend the money." },
      { callout: "A sinking fund is money saved gradually for a known future cost, like annual insurance, so it never blows up your budget at once." },
    ],
  },
  "pf-banking": {
    minutes: 3,
    blocks: [
      { p: "Banking is the plumbing of your financial life. Knowing how accounts and interest work helps you avoid fees and earn a little more." },
      { h: "Checking vs savings" },
      { p: "A checking account is built for everyday spending and frequent transactions. A savings account is meant to hold money and earn interest, usually with fewer withdrawals." },
      { term: "APY", def: "Annual percentage yield: the real yearly return on a deposit once compounding is included. A higher APY means more interest earned." },
      { term: "FDIC insurance", def: "Government backed protection for deposits at insured banks, up to a legal limit, if the bank fails. It does not cover investments." },
      { h: "Watch the fees" },
      { p: "Overdraft fees (spending more than your balance), monthly maintenance fees, and ATM fees quietly add up. Many online banks avoid them entirely." },
      { callout: "Two numbers identify a transfer: the routing number identifies the bank, the account number identifies you." },
    ],
  },
  "pf-credit-scores": {
    minutes: 3,
    blocks: [
      { p: "Your credit score is a single number, roughly 300 to 850, that tells lenders how trustworthy you are as a borrower. A higher score unlocks loans at lower interest rates, which can save thousands." },
      { h: "What moves the score" },
      { list: [
        "Payment history: paying on time is the single biggest factor.",
        "Credit utilization: how much of your available credit you use. Lower is better, often under 30 percent.",
        "Length of credit history: a longer track record helps.",
        "New credit and mix: many new applications at once can ding it.",
      ] },
      { term: "Hard vs soft inquiry", def: "A hard inquiry (applying for new credit) can lower your score slightly. A soft inquiry (checking your own score) does not." },
      { callout: "Closing your oldest card can actually hurt your score by shortening your history and cutting your available credit." },
    ],
  },
  "pf-credit-cards": {
    minutes: 3,
    blocks: [
      { p: "A credit card is a short term loan. Used well it builds credit and earns rewards. Used badly it is one of the most expensive forms of debt there is." },
      { h: "The one rule that matters most" },
      { p: "Pay your full statement balance every month. If you do, you pay zero interest on purchases thanks to the grace period. If you do not, interest starts piling up fast." },
      { term: "APR", def: "Annual percentage rate: the yearly interest charged on any balance you carry. Card APRs are often very high, sometimes above 20 percent." },
      { h: "The minimum payment trap" },
      { p: "Paying only the minimum keeps most of the balance accruing interest. A balance that feels small can take years to clear and cost far more than the original purchase." },
      { callout: "Rewards and cashback are only a real gain if you never pay interest. Otherwise the interest dwarfs the rewards." },
    ],
  },
  "pf-debt": {
    minutes: 3,
    blocks: [
      { p: "Debt is borrowing now and repaying more later. It is a tool that can build your future or trap you, depending on the interest rate and what you borrow for." },
      { term: "Principal vs interest", def: "Principal is the amount you borrowed. Interest is the extra cost charged for borrowing it." },
      { h: "Good debt vs bad debt" },
      { p: "Debt that funds something likely to grow your income or wealth, like education or a home, is often called good debt. High interest debt for consumption, like carrying a credit card balance, is the kind to avoid." },
      { h: "Two payoff strategies" },
      { list: [
        "Avalanche: pay extra toward the highest interest rate first. Saves the most money.",
        "Snowball: pay off the smallest balance first. Builds momentum and motivation.",
      ] },
      { callout: "On an amortized loan, early payments go mostly to interest because the balance is still large. Paying extra early saves a lot." },
    ],
  },
  "pf-taxes": {
    minutes: 3,
    blocks: [
      { p: "Taxes fund public services and come out of money you earn. Understanding the basics keeps surprises off your paycheck and your tax return." },
      { term: "Gross vs net pay", def: "Gross pay is your total earnings. Net pay is what actually lands in your account after taxes and deductions." },
      { h: "Brackets are marginal" },
      { p: "In a progressive system, moving into a higher bracket only taxes the income above that threshold at the higher rate, not all of your income. A raise never leaves you with less take home pay." },
      { term: "W-2 vs 1099", def: "A W-2 employee has taxes withheld by their employer. A 1099 contractor receives full pay and must handle their own taxes." },
      { callout: "A tax refund is not free money. It means you overpaid during the year and are getting your own money back." },
    ],
  },
  "pf-insurance": {
    minutes: 3,
    blocks: [
      { p: "Insurance is how you trade a small, predictable cost for protection against a rare but huge one. You pay a little regularly so a disaster does not wipe you out." },
      { term: "Premium", def: "The recurring amount you pay (often monthly) to keep a policy active." },
      { term: "Deductible", def: "The amount you pay out of pocket on a claim before insurance starts covering the rest." },
      { h: "Premium and deductible trade off" },
      { p: "Plans with lower premiums usually have higher deductibles, and the reverse. The right balance depends on how likely you are to need the coverage and what you could afford in a claim." },
      { callout: "Liability insurance covers harm you cause to others, which is why it is legally required for drivers in most places." },
    ],
  },

  // --------------------------- Investing ---------------------------------
  "inv-compound": {
    minutes: 3,
    blocks: [
      { p: "Compound interest is the engine behind almost all long term wealth. It is interest earned on your money plus all the interest it has already earned, so growth accelerates over time." },
      { h: "Why time beats timing" },
      { p: "The earliest dollars you invest do the heaviest lifting, because they compound the longest. Starting at 22 instead of 32 can mean ending with far more, even with the same monthly amount." },
      { term: "Rule of 72", def: "Divide 72 by your annual return to estimate the years it takes money to double. At 8 percent, money doubles in about 9 years." },
      { callout: "$1,000 at 8 percent for 30 years grows to about $10,000. Compounding turns it into roughly 10x, not 3x." },
      { p: "Inflation is the flip side: because prices rise, a dollar today is worth more than a dollar later. That is why letting money sit idle quietly loses value." },
    ],
  },
  "inv-stocks": {
    minutes: 3,
    blocks: [
      { p: "A share of stock is a small piece of ownership in a real company. If the company grows and prospers, owners share in that success." },
      { h: "Two ways to gain" },
      { list: [
        "Price appreciation: the share becomes worth more than you paid.",
        "Dividends: some companies pay out part of their profits to shareholders.",
      ] },
      { term: "Market capitalization", def: "Share price times the number of shares. It reflects the market's view of a company's total size." },
      { h: "The tradeoff" },
      { p: "Stocks have historically delivered strong long term returns, but prices swing and nothing is guaranteed. That volatility is the price of admission for the higher potential return." },
      { callout: "A stock split changes the number of shares and the price but not your total value. Two for one means twice the shares at half the price." },
    ],
  },
  "inv-bonds": {
    minutes: 3,
    blocks: [
      { p: "A bond is essentially a loan you make to a government or company. They pay you interest along the way and return your principal at the end." },
      { term: "Coupon", def: "The interest payment a bond makes to its holder, usually a yearly rate of the bond's face value." },
      { term: "Maturity", def: "The date when the issuer repays the bond's principal and the bond ends." },
      { h: "Why hold bonds" },
      { p: "Bonds are generally steadier and lower return than stocks, which makes them a common tool to reduce the overall risk of a portfolio." },
      { callout: "Bond prices move opposite to interest rates. When new bonds pay more, older lower rate bonds become less attractive and fall in price." },
    ],
  },
  "inv-funds": {
    minutes: 3,
    blocks: [
      { p: "Instead of betting on single stocks, an index fund lets you buy a whole market in one package. It holds many companies to track an index like the S&P 500." },
      { term: "Expense ratio", def: "The yearly fee to run a fund, as a percent of your investment. Lower is better, because fees compound against you over time." },
      { h: "Why so many people use them" },
      { p: "Index funds give instant diversification at very low cost, and decades of evidence show most active stock pickers fail to beat the market after fees." },
      { term: "ETF", def: "Exchange traded fund: a fund that trades on an exchange like a stock throughout the day, unlike a mutual fund that prices once after close." },
      { callout: "A 0.04 percent expense ratio costs just $4 a year per $10,000. Small fees matter enormously over decades." },
    ],
  },
  "inv-diversification": {
    minutes: 3,
    blocks: [
      { p: "Diversification is the closest thing investing has to a free lunch. By spreading money across many investments, one bad outcome cannot sink everything." },
      { h: "Risk and return are linked" },
      { p: "Higher potential returns come with higher risk. There is no reliable way to earn high returns with no risk, and anyone promising that is a warning sign." },
      { term: "Volatility", def: "How much an investment's price swings up and down. Higher volatility means bigger, more frequent moves." },
      { h: "Two kinds of risk" },
      { p: "Company specific risk can be diversified away by owning many companies. Market wide risk, like a recession, affects nearly everything and cannot be diversified away." },
      { callout: "Your time horizon shapes your risk. A long horizon can ride out dips, so it can usually hold more volatile, higher return assets." },
    ],
  },
  "inv-retirement": {
    minutes: 3,
    blocks: [
      { p: "Retirement accounts are special investment accounts that give you tax advantages as a reward for investing for the long term." },
      { term: "401(k)", def: "An employer sponsored retirement account funded from your paycheck, often with an employer match." },
      { h: "Never leave the match on the table" },
      { p: "If your employer matches contributions, that is an immediate, guaranteed return on your money. Contributing enough to get the full match is one of the best deals in finance." },
      { term: "Traditional vs Roth", def: "Traditional accounts often give a tax break now and tax withdrawals later. Roth accounts use after tax money now, then grow and withdraw tax free." },
      { callout: "A young person in a low tax bracket often benefits from a Roth: pay the small tax now, withdraw tax free later." },
    ],
  },
  "inv-market": {
    minutes: 3,
    blocks: [
      { p: "Markets can feel chaotic, but the basics are simple. Prices move as buyers and sellers react to news and expectations." },
      { term: "Bull vs bear market", def: "A bull market is an extended period of rising prices and optimism. A bear market is a sustained decline, often 20 percent or more." },
      { h: "Why timing the market fails" },
      { p: "Prices already reflect known information, and a large share of gains come in just a few unpredictable days. Missing those days badly hurts returns, so most investors do better staying invested." },
      { term: "Liquidity", def: "How quickly an asset can be turned into cash near its value. Big company stocks are very liquid, real estate much less so." },
      { callout: "Time in the market generally beats timing the market. Consistency tends to win over cleverness." },
    ],
  },

  // --------------------------- Economics ---------------------------------
  "eco-scarcity": {
    minutes: 3,
    blocks: [
      { p: "Economics starts from one fact: resources are limited but wants are not. That gap, called scarcity, forces every person, business, and government to make choices." },
      { term: "Opportunity cost", def: "The value of the next best option you give up when you make a choice. Even free time has a cost." },
      { p: "If you spend Saturday studying instead of working an $80 shift, the opportunity cost of studying is that $80, even though no money left your pocket." },
      { term: "Comparative advantage", def: "Producing something at a lower opportunity cost than someone else. It is why trade and specializing benefit both sides." },
      { callout: "A sunk cost is money already spent and gone. Good decisions ignore it and focus on future costs and benefits." },
    ],
  },
  "eco-supply-demand": {
    minutes: 3,
    blocks: [
      { p: "Supply and demand are the two forces that set the price of almost everything. Where they meet is the price that clears the market." },
      { list: [
        "Law of demand: as price rises, people generally buy less.",
        "Law of supply: as price rises, producers generally offer more.",
      ] },
      { term: "Equilibrium", def: "The price where the quantity buyers want equals the quantity sellers offer." },
      { h: "Shifts move the whole curve" },
      { p: "A change in the good's own price moves you along a curve. A change in income, tastes, or related goods shifts the entire curve, creating a new equilibrium." },
      { callout: "A price ceiling set below equilibrium tends to cause shortages. A price floor set above it tends to cause surpluses." },
    ],
  },
  "eco-elasticity": {
    minutes: 3,
    blocks: [
      { p: "Elasticity measures how sensitive people are to a price change. It explains why a price hike helps some businesses and hurts others." },
      { term: "Elastic demand", def: "Quantity demanded changes a lot when price changes. Common when there are many substitutes." },
      { term: "Inelastic demand", def: "Quantity demanded barely changes when price changes. Common for necessities with few substitutes." },
      { h: "Why it matters for revenue" },
      { p: "If demand is elastic, raising prices can lower total revenue because buyers leave. If demand is inelastic, raising prices can raise revenue because buyers stay." },
      { callout: "Governments tax inelastic goods like fuel and cigarettes because people keep buying them even as prices rise." },
    ],
  },
  "eco-inflation": {
    minutes: 3,
    blocks: [
      { p: "Inflation is a general rise in prices over time. It means each unit of money buys a little less than it used to." },
      { term: "CPI", def: "Consumer Price Index: tracks the price of a basket of common goods and services, a standard gauge of inflation." },
      { term: "Real vs nominal", def: "Nominal is the face value in dollars. Real is adjusted for inflation to show true purchasing power." },
      { h: "Why idle cash loses" },
      { p: "If your savings earn 3 percent while inflation is 5 percent, your real return is about negative 2 percent. Your money grew, but it buys less." },
      { callout: "Owning productive assets like stocks or real estate can help offset inflation, since their value and income can rise with prices." },
    ],
  },
  "eco-market-structures": {
    minutes: 3,
    blocks: [
      { p: "Market structure describes how much competition a market has, which shapes prices, choice, and quality." },
      { list: [
        "Perfect competition: many sellers of identical goods, all price takers.",
        "Monopolistic competition: many firms with differentiated products, like restaurants.",
        "Oligopoly: a few large firms dominate.",
        "Monopoly: a single seller with no close substitutes.",
      ] },
      { h: "Why monopolies concern economists" },
      { p: "Without competition, a monopoly can restrict output and charge higher prices than a competitive market would. That is why antitrust laws exist." },
      { callout: "More competition generally pushes prices down and choice up. Barriers to entry protect incumbents from that pressure." },
    ],
  },
  "eco-macro": {
    minutes: 3,
    blocks: [
      { p: "Macroeconomics zooms out to the whole economy. A few key indicators act like dashboard lights for how it is doing." },
      { term: "GDP", def: "Gross domestic product: the total value of goods and services an economy produces in a period." },
      { term: "Unemployment rate", def: "The share of the labor force that is jobless and actively looking for work." },
      { h: "The business cycle" },
      { p: "Economies move through expansion, peak, contraction, and recovery. A recession is a significant, broad decline, often two consecutive quarters of falling GDP." },
      { callout: "Real GDP strips out inflation, so it shows true output growth. Nominal growth minus inflation gives a rough real growth figure." },
    ],
  },
  "eco-policy": {
    minutes: 3,
    blocks: [
      { p: "Governments and central banks have two big levers to steer the economy: fiscal policy and monetary policy." },
      { term: "Fiscal policy", def: "Government use of spending and taxes to influence the economy. Run by the government." },
      { term: "Monetary policy", def: "A central bank managing interest rates and the money supply. Run by a central bank like the Federal Reserve." },
      { h: "How they fight problems" },
      { p: "To cool high inflation, a central bank usually raises interest rates to slow borrowing and spending. To fight a recession, governments may spend more or cut taxes to boost demand." },
      { callout: "A deficit is the yearly shortfall when spending tops revenue. The national debt is the running total of past deficits." },
    ],
  },

  // ----------------------- Entrepreneurship ------------------------------
  "ent-basics": {
    minutes: 3,
    blocks: [
      { p: "Every business, from a lemonade stand to a tech giant, does the same core thing: it creates value for customers and captures part of it as revenue." },
      { term: "Value proposition", def: "The clear reason a customer would choose you over alternatives or over doing nothing." },
      { term: "Business model", def: "The plan for how a business creates, delivers, and captures value: what it offers, to whom, and how money flows." },
      { h: "Know your customer" },
      { p: "A target market is the specific group you aim to serve. Trying to serve everyone usually means serving no one well." },
      { callout: "Product market fit is the moment a product clearly satisfies real demand, shown by people using it, paying for it, and recommending it." },
    ],
  },
  "ent-revenue": {
    minutes: 3,
    blocks: [
      { p: "The survival math of any business comes down to three words: revenue, costs, and profit." },
      { list: [
        "Revenue: the total money from sales. The top line.",
        "Costs: everything you spend to operate.",
        "Profit: revenue minus costs. What is actually kept.",
      ] },
      { term: "Fixed vs variable costs", def: "Fixed costs stay the same regardless of sales (rent). Variable costs rise with each sale (materials)." },
      { term: "Profit margin", def: "Profit as a percent of revenue. It shows how much of each sales dollar you keep." },
      { callout: "Break even is the sales level where revenue covers total costs. Below it you lose money, above it you profit." },
    ],
  },
  "ent-cashflow": {
    minutes: 3,
    blocks: [
      { p: "Profit is an opinion, but cash is a fact. Many profitable businesses fail simply because they run out of cash at the wrong moment." },
      { term: "Cash flow", def: "The movement of money in and out of a business over time. Positive means more is coming in than going out." },
      { h: "Why profit is not cash" },
      { p: "If customers owe you money that has not arrived, but rent and payroll are due today, you can be profitable on paper and still unable to pay your bills." },
      { term: "Runway and burn rate", def: "Burn rate is how fast you spend cash, usually per month. Runway is how many months you can last, equal to cash divided by burn." },
      { callout: "Collect what you are owed faster and delay nonessential spending. Those are the two levers that most improve short term cash." },
    ],
  },
  "ent-pricing": {
    minutes: 3,
    blocks: [
      { p: "Price is one of the most powerful levers a business has. Set it too low and you starve, too high and customers walk." },
      { term: "Cost plus pricing", def: "Setting price by adding a fixed margin on top of cost. Simple, but ignores what customers will actually pay." },
      { term: "Value based pricing", def: "Pricing based on the value the product delivers to the customer, which can capture far more than cost plus." },
      { h: "Common tactics" },
      { list: [
        "Loss leader: price one item low to draw people in, profit on the rest.",
        "Subscriptions: trade one time sales for predictable recurring revenue.",
        "Price discrimination: charge different groups different prices, like student discounts.",
      ] },
      { callout: "Pricing too low can erase your margin and signal low quality. Cheap is not always more attractive." },
    ],
  },
  "ent-startups": {
    minutes: 3,
    blocks: [
      { p: "A startup is a young company built to grow fast around a new idea. Getting there usually takes money, and how you raise it matters." },
      { term: "Bootstrapping", def: "Funding the business yourself from savings and revenue, without outside investors. You keep control but grow slower." },
      { term: "Equity", def: "Ownership of the company, usually in shares. Raising money by selling equity gives investors a piece of the business." },
      { h: "The funding tradeoff" },
      { p: "Venture investors give cash in exchange for equity, betting on big growth. That fuel comes at the cost of ownership and some control." },
      { callout: "If investors pay $1,000,000 for 25 percent, the whole company is implied to be worth $4,000,000. That is its valuation." },
    ],
  },

  // ---------------------- Money Psychology -------------------------------
  "psy-biases": {
    minutes: 3,
    blocks: [
      { p: "Your brain uses mental shortcuts to make fast decisions. They are useful for survival but can quietly sabotage your money choices." },
      { list: [
        "Loss aversion: losses hurt more than equal gains feel good.",
        "Anchoring: leaning on the first number you see, like a high 'original' price.",
        "Present bias: overvaluing rewards now versus larger rewards later.",
        "Sunk cost fallacy: sticking with something because of what you already spent.",
      ] },
      { h: "Herd and confirmation" },
      { p: "Herd behavior is buying because everyone else is, which inflates bubbles. Confirmation bias is seeking only evidence that agrees with you, which breeds overconfidence." },
      { callout: "The simplest defense is a waiting period and rules set in advance, like automatic saving, that take in the moment emotion out of it." },
    ],
  },
  "psy-fraud": {
    minutes: 4,
    blocks: [
      { p: "Scammers do not break in, they trick you into opening the door. Learning the patterns is the best protection there is." },
      { term: "Phishing", def: "Fake messages pretending to be a trusted organization, designed to trick you into giving up passwords or card numbers." },
      { term: "Ponzi scheme", def: "A fraud that pays earlier investors with money from new ones, not real profits. It collapses when new money stops." },
      { h: "Red flags to watch for" },
      { list: [
        "Guaranteed high returns with little or no risk.",
        "Pressure and urgency: act now, account suspended.",
        "Requests for upfront fees to claim a prize or loan.",
        "Anyone asking for your password or full card number.",
      ] },
      { callout: "If a bank or service contacts you unexpectedly, hang up and call back using the official number on your card. Never trust the caller's claimed identity." },
      { p: "Protect your accounts with strong, unique passwords and two factor authentication, so one leaked password does not unlock everything." },
    ],
  },
  "psy-mindset": {
    minutes: 3,
    blocks: [
      { p: "Money skills are as much about psychology as math. The attitudes and habits you build matter more than any single decision." },
      { term: "Delayed gratification", def: "Resisting a smaller reward now for a bigger benefit later. One of the strongest predictors of long term financial success." },
      { h: "Watch the comparison trap" },
      { p: "Keeping up with the lifestyles you see, especially on social media, drives overspending. Feeds show curated highlights, not the debt or stress behind them." },
      { term: "Lifestyle inflation", def: "Letting spending rise every time income rises, so savings never grow. Holding spending steady and banking raises builds wealth." },
      { callout: "Automating good habits beats relying on willpower, because it makes the smart choice the default you do not have to think about." },
    ],
  },
  "psy-spending": {
    minutes: 3,
    blocks: [
      { p: "Stores and apps are carefully designed to make you spend more than you planned. Seeing the tactics is the first step to resisting them." },
      { list: [
        "Impulse buys: unplanned purchases triggered by emotion or placement, like checkout displays.",
        "FOMO: limited time and limited stock messaging that rushes you.",
        "Free trials: rely on you forgetting to cancel before billing starts.",
        "Subscription creep: many small recurring charges that add up and get forgotten.",
      ] },
      { h: "Why digital spending is sneaky" },
      { p: "Paying by card or phone feels less painful than handing over cash, so the spending is easier to ignore and easier to overdo." },
      { callout: "Pause before buying and ask one question: did I want this before I saw the ad? It breaks the automatic reaction marketing relies on." },
    ],
  },
  "psy-goals": {
    minutes: 3,
    blocks: [
      { p: "A goal you can measure is a goal you can reach. Turning vague money wishes into concrete targets is what makes progress happen." },
      { term: "SMART goals", def: "Specific, Measurable, Achievable, Relevant, and Time bound. 'Save $1,000 in 10 months' beats 'save more someday'." },
      { h: "Short term vs long term" },
      { p: "Short term goals arrive within a year and are usually saved for. Long term goals take years and benefit from investing, where compounding can help." },
      { term: "Net worth", def: "What you own minus what you owe. Watching it grow over time is a clear measure of overall financial progress." },
      { callout: "A common order: capture any employer match, then clear high interest debt, then build savings and invest. A starter emergency fund is a great first goal." },
    ],
  },
  // ----------------------- Credit and Borrowing --------------------------
  "cr-how": {
    minutes: 3,
    blocks: [
      { p: "Credit is simply borrowing money now and repaying it later. The whole system runs on trust that you will pay back what you owe." },
      { term: "Principal vs interest", def: "Principal is the amount you borrow. Interest is the extra the lender charges for the privilege of borrowing it." },
      { h: "Secured vs unsecured" },
      { p: "A secured loan is backed by collateral the lender can seize if you stop paying, like a car or house. An unsecured loan has none, so it usually carries a higher rate to offset the lender's risk." },
      { term: "Default", def: "Failing to make payments as agreed. It badly damages your credit and can send the debt to collections." },
      { callout: "A co-signer promises to repay if you cannot. It can help you qualify, but it puts their credit on the line too." },
    ],
  },
  "cr-interest": {
    minutes: 3,
    blocks: [
      { p: "Interest is the price of borrowing. Understanding how it is calculated is the difference between a loan that helps you and one that quietly drains you." },
      { term: "APR", def: "Annual percentage rate: the yearly cost of a loan including interest and certain fees, which makes loans easier to compare." },
      { h: "Simple vs compound" },
      { p: "Simple interest is charged only on the principal. Compound interest is charged on the principal plus unpaid interest, so debt can snowball if you do not keep up." },
      { p: "On a credit card, paying the full statement balance by the due date uses the grace period and avoids interest entirely." },
      { callout: "A longer loan term lowers the monthly payment but means more total interest. A low payment is not the same as a cheap loan." },
    ],
  },
  "cr-loans": {
    minutes: 3,
    blocks: [
      { p: "Not all loans are the same. The type, term, and whether it is secured all shape what you pay." },
      { list: [
        "Mortgage: a long term loan to buy property, secured by the home.",
        "Auto loan: secured by the vehicle, which can be repossessed.",
        "Student loan: funds education, often with flexible repayment.",
        "Personal loan: general purpose, usually unsecured, repaid in installments.",
      ] },
      { term: "Amortization", def: "Paying off a loan through regular payments split between interest and principal, with early payments going mostly to interest." },
      { callout: "A larger down payment means borrowing less, often a lower rate, and on a mortgage it can avoid private mortgage insurance (PMI)." },
    ],
  },
  "cr-reports": {
    minutes: 3,
    blocks: [
      { p: "Your credit report is the detailed record of how you borrow and repay. Your credit score is a single number, often 300 to 850, calculated from it." },
      { h: "What drives the score" },
      { list: [
        "Payment history: paying on time is the biggest factor.",
        "Credit utilization: keep balances low relative to limits, often under 30 percent.",
        "Length of history: longer is better.",
      ] },
      { term: "Hard vs soft inquiry", def: "Applying for credit is a hard inquiry that can slightly lower your score. Checking your own score is a soft inquiry with no effect." },
      { callout: "You can dispute errors on your report, and a credit freeze blocks new accounts being opened in your name." },
    ],
  },
  "cr-manage": {
    minutes: 3,
    blocks: [
      { p: "Debt is manageable with a plan. The two classic payoff strategies trade speed against motivation." },
      { list: [
        "Avalanche: pay extra on the highest rate debt first. Saves the most money.",
        "Snowball: pay off the smallest balance first. Builds momentum.",
      ] },
      { term: "Debt to income ratio (DTI)", def: "Your monthly debt payments divided by your monthly income. Lenders use it to judge how much more you can borrow." },
      { p: "Automatic payments protect you from missed due dates, and paying more than the minimum shrinks the balance far faster." },
      { callout: "Capturing a full employer retirement match usually comes before overpaying low interest debt, since the match is an instant guaranteed return." },
    ],
  },
  "cr-traps": {
    minutes: 3,
    blocks: [
      { p: "Some borrowing products are designed to keep you stuck. Recognizing them is the best protection." },
      { list: [
        "Payday loans: tiny short term loans with sky high fees, due on your next payday.",
        "Car title loans: use your car as collateral at very high rates.",
        "Minimum payments: leave most of the balance accruing interest for years.",
      ] },
      { term: "Predatory lending", def: "Lending with unfair, deceptive, or abusive terms that exploits borrowers, often with hidden fees and pressure to sign fast." },
      { callout: "Before signing anything, read the terms, including the APR and every fee. An emergency fund is the best alternative to high cost borrowing." },
    ],
  },

  // ----------------------- Crypto and Modern Finance ---------------------
  "cm-money": {
    minutes: 3,
    blocks: [
      { p: "Before crypto, it helps to understand what money actually is. Money does three jobs: a medium of exchange, a store of value, and a unit of account." },
      { term: "Fiat money", def: "Currency a government declares legal tender, valued because people trust the government, not because it is backed by gold." },
      { h: "Why scarcity matters" },
      { p: "Anything used as money must be limited in supply. If it could be created without limit, it would quickly lose value, which is what happens in hyperinflation." },
      { callout: "Most money today is already digital, moving as entries in bank systems rather than physical cash." },
    ],
  },
  "cm-blockchain": {
    minutes: 3,
    blocks: [
      { p: "A blockchain is a shared digital ledger copied across many computers. Transactions are grouped into blocks and linked in a chain." },
      { term: "Decentralized", def: "No single party controls the ledger. It is maintained by a network of participants instead of one authority." },
      { h: "Why it resists tampering" },
      { p: "Because each block links to the one before and copies exist across the network, changing past records is extremely hard. That makes confirmed entries effectively immutable." },
      { term: "Smart contract", def: "Self executing code on a blockchain that runs automatically when its conditions are met, without a middleman." },
      { callout: "Blockchain is the underlying technology. Cryptocurrency is one use of it, not the same thing." },
    ],
  },
  "cm-crypto": {
    minutes: 3,
    blocks: [
      { p: "A cryptocurrency is a digital asset secured by cryptography, usually tracked on a blockchain rather than issued by a bank." },
      { term: "Private key", def: "A secret code that proves ownership and authorizes transactions. Anyone who has it controls the funds, so it must never be shared." },
      { h: "You are your own bank" },
      { p: "With self custody there is no bank to call. Lose your key or seed phrase and the funds are usually gone for good. Confirmed transactions are also generally irreversible." },
      { term: "Stablecoin", def: "A cryptocurrency designed to hold a steady value, often pegged to a currency like the dollar, to avoid wild price swings." },
      { callout: "A hot wallet is online and convenient but more exposed. A cold wallet stays offline and is more secure." },
    ],
  },
  "cm-risk": {
    minutes: 3,
    blocks: [
      { p: "Crypto can move sharply in a single day. That volatility, plus a flood of scams, makes it a high risk, speculative area." },
      { h: "Scams to know" },
      { list: [
        "Rug pull: creators hype a project, take the money, and vanish.",
        "Pump and dump: hype inflates a coin, insiders sell, it crashes.",
        "Guaranteed returns: no real investment can promise them, so it signals fraud.",
      ] },
      { p: "Most crypto is not government insured, so a hack or platform collapse can mean permanent loss with no recovery." },
      { callout: "Only invest what you can afford to lose, keep crypto a small part of a diversified portfolio, and secure your keys." },
    ],
  },
  "cm-fintech": {
    minutes: 3,
    blocks: [
      { p: "Fintech is technology that makes financial services faster and more accessible, from payment apps to automated investing." },
      { list: [
        "Peer to peer apps: send money between people instantly.",
        "Robo-advisors: build and manage a portfolio automatically, usually cheaply.",
        "Buy now, pay later: split a purchase into installments, sometimes interest free if paid on time.",
      ] },
      { h: "Convenience has a cost" },
      { p: "Frictionless apps can encourage impulsive spending or overtrading, and some are not insured banks, so check how your money is protected." },
      { callout: "Research an app's reputation, fees, and protections before depositing, and always turn on two factor authentication." },
    ],
  },
  "cm-future": {
    minutes: 3,
    blocks: [
      { p: "The future of money is still being written. Stablecoins, central bank digital currencies, and new rules are all in play." },
      { term: "CBDC", def: "A central bank digital currency: a digital form of a country's official currency, combining digital convenience with central bank backing." },
      { term: "DeFi", def: "Decentralized finance: services like lending built on blockchains without traditional intermediaries. It carries new risks alongside its promise." },
      { h: "Stay curious but skeptical" },
      { p: "Regulation, adoption, and technology are all uncertain, so betting everything on one outcome is speculative. A measured view sees real potential and real risk." },
      { callout: "As money gets more digital, financial literacy matters more, not less, because new tools bring new scams." },
    ],
  },

  // ----------------------- Career and Income -----------------------------
  "ca-paychecks": {
    minutes: 3,
    blocks: [
      { p: "Your paycheck is smaller than your salary, and knowing why keeps surprises off your bank statement." },
      { term: "Gross vs net pay", def: "Gross pay is your total earnings. Net pay, or take home pay, is what is left after taxes and deductions." },
      { h: "What comes out" },
      { p: "Employers withhold income tax and FICA taxes (which fund Social Security and Medicare) before you ever see the money. A pay stub breaks it all down." },
      { term: "W-4 vs W-2", def: "A W-4 tells your employer how much tax to withhold. A W-2 summarizes your earnings and withholding at year end." },
      { callout: "Two people with the same salary can have different take home pay, depending on retirement contributions, insurance, and tax choices." },
    ],
  },
  "ca-benefits": {
    minutes: 3,
    blocks: [
      { p: "Your salary is only part of what a job is worth. Benefits can add thousands in real value." },
      { term: "Total compensation", def: "Your salary plus the value of benefits like health insurance, a retirement match, and paid time off." },
      { h: "The match is free money" },
      { p: "An employer 401(k) match adds to your retirement based on what you contribute. Not getting the full match is leaving guaranteed money on the table." },
      { term: "Vesting", def: "The schedule by which employer contributions become fully yours. Leaving early can mean forfeiting some of them." },
      { callout: "When comparing offers, add the dollar value of benefits to the salary. A lower salary with strong benefits can win." },
    ],
  },
  "ca-income-types": {
    minutes: 3,
    blocks: [
      { p: "Income comes in different forms, and how you earn it affects taxes, stability, and how much it can grow." },
      { list: [
        "Earned income: wages and salary from working.",
        "Passive income: rent, dividends, or royalties that need little ongoing effort.",
        "Portfolio income: interest, dividends, and gains from investments.",
      ] },
      { term: "W-2 vs 1099", def: "A W-2 employee has taxes withheld. A 1099 contractor gets full pay and must handle their own taxes, including self-employment tax." },
      { callout: "Multiple income streams spread risk, and income from assets can scale beyond the hours you personally work." },
    ],
  },
  "ca-negotiation": {
    minutes: 3,
    blocks: [
      { p: "Negotiating is normal and often expected. Done well, it can raise your pay for years, since future raises build on your current salary." },
      { h: "Prepare first" },
      { p: "Research market pay for your role, experience, and area so your ask is realistic and defensible. It often helps to let the employer name a number first to avoid anchoring yourself low." },
      { p: "If salary is fixed, you can still negotiate a signing bonus, paid time off, remote work, or a start date." },
      { callout: "Leverage comes from knowing your value, having alternatives, and staying calm and professional, not from hostility. Get the final offer in writing." },
    ],
  },
  "ca-gig": {
    minutes: 3,
    blocks: [
      { p: "Gig and freelance work trade the steady paycheck of a job for flexibility and independence." },
      { h: "The tradeoffs" },
      { p: "Freelancers set their own schedule but face irregular income and no employer benefits like insurance or a retirement match. They also handle their own taxes." },
      { term: "Self-employment tax", def: "Self-employed people cover both the employee and employer share of Social Security and Medicare, since no employer pays half." },
      { p: "Because nothing is withheld, freelancers should set aside a portion of each payment and often pay estimated taxes quarterly." },
      { callout: "A bigger emergency fund and a mix of clients protect against the income swings of gig work." },
    ],
  },
  "ca-growth": {
    minutes: 3,
    blocks: [
      { p: "Your career is a long term asset. Choices about skills and roles compound into your lifetime earnings, not just this year's pay." },
      { term: "Human capital", def: "The skills, knowledge, and experience that make you valuable in the workforce. Investing in it raises your earning potential." },
      { h: "What raises income" },
      { list: [
        "Building in demand skills and a strong reputation.",
        "Networking, since many opportunities come through people you know.",
        "Continuous learning, because industries change.",
      ] },
      { callout: "Weigh education by its return: does the income boost outweigh the cost and debt? A high cost degree is not always worth it." },
    ],
  },

  // ----------------------- Real Estate and Big Purchases -----------------
  "re-rentbuy": {
    minutes: 3,
    blocks: [
      { p: "Renting and buying each have real advantages. The right choice depends on your situation, not a one size fits all rule." },
      { list: [
        "Renting: flexibility to move and fewer maintenance responsibilities, but no equity.",
        "Buying: you build equity and can gain if the value rises, but with more cost and responsibility.",
      ] },
      { h: "Watch the costs of owning" },
      { p: "Owning is not just a mortgage. Property taxes, insurance, maintenance, and possibly HOA fees add up, and buying or selling carries large transaction costs." },
      { callout: "Buying rarely makes sense if you will move within a year or two, since transaction costs can outweigh any equity gained." },
    ],
  },
  "re-mortgage": {
    minutes: 3,
    blocks: [
      { p: "A mortgage is a long term loan to buy a home, with the home itself as collateral. Miss enough payments and the lender can foreclose." },
      { term: "Down payment", def: "The cash you pay upfront. A larger one means a smaller loan and often better terms, and 20 percent or more can avoid PMI." },
      { h: "Fixed vs adjustable" },
      { p: "A fixed rate mortgage keeps the same rate for the loan's life. An adjustable rate can change after an initial period, so payments may rise or fall." },
      { p: "Early payments go mostly to interest because the balance is largest at the start. Later payments shift toward principal." },
      { callout: "A higher credit score earns a lower mortgage rate, which over decades can save tens of thousands of dollars." },
    ],
  },
  "re-costs": {
    minutes: 3,
    blocks: [
      { p: "The purchase price is only the beginning. The true cost of a home includes many ongoing and one time expenses." },
      { list: [
        "Closing costs: one time fees to finalize the purchase, often a few percent of the price.",
        "Property taxes: a recurring tax based on the home's value, which can rise over time.",
        "Insurance and maintenance: ongoing costs, often roughly one percent of the home's value yearly for upkeep.",
      ] },
      { term: "Escrow account", def: "An account that collects part of your monthly payment to pay property taxes and insurance when they come due." },
      { callout: "A cheaper home can cost more to own if it needs major repairs, so a home inspection before buying is worth it." },
    ],
  },
  "re-cars": {
    minutes: 3,
    blocks: [
      { p: "A car is one of the biggest purchases most people make, and its real cost goes well beyond the sticker price." },
      { term: "Depreciation", def: "The loss in a vehicle's value over time. New cars often lose the most in the first few years." },
      { h: "Buy or lease" },
      { p: "Leasing usually means lower monthly payments but no ownership at the end. Buying costs more monthly but eventually gives you an owned asset. A long loan risks being 'upside down', owing more than the car is worth." },
      { p: "Total cost includes insurance, fuel, maintenance, registration, and depreciation, not just the price." },
      { callout: "A slightly used car avoids the steepest early depreciation, often making it the better financial choice." },
    ],
  },
  "re-bigbuys": {
    minutes: 3,
    blocks: [
      { p: "Any large, financed purchase deserves a framework, not an impulse. The goal is to weigh the full cost against the benefit." },
      { h: "Look past the monthly payment" },
      { p: "Sellers love quoting a low monthly payment, which they reach by stretching the loan and adding interest. Always look at the total cost, including the rate and term." },
      { term: "Opportunity cost", def: "What else the money could have done, like being saved or invested. Every big purchase has one." },
      { p: "A sinking fund, saving gradually for a known cost, lets you pay cash or borrow less when the time comes." },
      { callout: "A short waiting period before a big buy curbs impulse decisions and gives time to compare options." },
    ],
  },
  "re-equity": {
    minutes: 3,
    blocks: [
      { p: "Home equity is the part of your home you truly own: its value minus what you still owe on the mortgage." },
      { h: "Two ways it grows" },
      { p: "Equity rises as you pay down the principal and as the home appreciates. Each mortgage payment acts a bit like forced saving." },
      { term: "Appreciation", def: "An increase in an asset's value over time. Real estate can appreciate, but it is not guaranteed and can fall." },
      { p: "You can borrow against equity with a home equity loan or line of credit, but that adds debt secured by your home." },
      { callout: "For many households, home equity becomes a major part of net worth, but borrowing heavily against it is risky if values drop." },
    ],
  },

  // ----------------------- Financial Independence ------------------------
  "fi-what": {
    minutes: 3,
    blocks: [
      { p: "Financial independence means having enough assets or passive income to cover your needs without depending on a paycheck. It turns work into a choice." },
      { term: "FIRE", def: "Financial independence retire early: saving and investing aggressively to reach freedom from required work sooner than usual." },
      { p: "At its core it is about buying back your time, not about being rich. A modest lifestyle can reach it without a fortune." },
      { term: "FI number", def: "A rough target for the assets needed so investment returns could cover your yearly expenses. It is a planning guideline, not a guarantee." },
      { callout: "The often cited 4 percent idea comes from historical averages. Real outcomes depend on markets and spending, so treat it as a rough tool." },
    ],
  },
  "fi-rate": {
    minutes: 3,
    blocks: [
      { p: "Your savings rate, the share of income you save rather than spend, is the single number that most drives how fast independence arrives." },
      { h: "Why it matters twice" },
      { p: "A higher savings rate builds assets faster and trains you to live on less, which shrinks the target you need to hit. It attacks the goal from both sides." },
      { p: "Automating transfers on payday makes saving the default, so it does not rely on monthly willpower." },
      { callout: "Cutting a recurring expense beats a one time saving: it saves every month and lowers the long term amount you need." },
    ],
  },
  "fi-streams": {
    minutes: 3,
    blocks: [
      { p: "Income that keeps coming without trading every hour is central to independence. Multiple streams also reduce reliance on any single source." },
      { p: "A growing investment portfolio can pay dividends and interest and appreciate, becoming a source you draw on later. Reinvesting early lets returns compound." },
      { term: "Passive income reality", def: "Most passive income needs real upfront work or capital and some upkeep, so the label oversimplifies. Be skeptical of effortless income pitches." },
      { callout: "Diversifying income streams is like diversifying investments: spreading across several limits the damage if one fails." },
    ],
  },
  "fi-enough": {
    minutes: 3,
    blocks: [
      { p: "Lifestyle design means intentionally choosing how you live and spend to match your values, rather than drifting with defaults." },
      { term: "Hedonic treadmill", def: "The tendency to quickly adapt to new things, so purchases stop feeling special and you chase the next one." },
      { p: "Defining enough gives you a reachable target instead of an endless race. Without it, rising wants keep moving the goalpost." },
      { p: "Healthy frugality is intentional: invest in what you value, trim what you do not. Extreme deprivation can backfire into burnout." },
      { callout: "Money supports wellbeing up to a point. Beyond needs, how you use it tends to matter more than how much you have." },
    ],
  },
  "fi-miles": {
    minutes: 3,
    blocks: [
      { p: "A long journey is easier with checkpoints. Common milestones mark real progress toward independence." },
      { list: [
        "A small starter emergency fund.",
        "Becoming free of high interest debt.",
        "A fully funded emergency fund of several months of expenses.",
        "Capturing the full employer retirement match.",
      ] },
      { term: "Coast FIRE", def: "Having invested enough early that compounding alone can reach your target, so you only need to cover current costs." },
      { callout: "The first portion is the hardest, since early on there is little compounding and progress relies mostly on your contributions." },
    ],
  },
  "fi-risks": {
    minutes: 3,
    blocks: [
      { p: "Pursuing early freedom has honest downsides worth planning for, not just upsides." },
      { term: "Sequence of returns risk", def: "The danger that poor market returns early in withdrawal deplete a portfolio faster, even if averages later recover." },
      { list: [
        "Lifestyle inflation that keeps savings flat.",
        "Burnout from extreme frugality or overwork.",
        "Inflation eroding purchasing power over a long retirement.",
        "Health care costs after leaving an employer plan.",
      ] },
      { callout: "Flexibility, a cash buffer, and enjoying the journey make a plan resilient. It is a powerful goal, but not risk free or guaranteed." },
    ],
  },

  // ----------------------- The Economy Around You ------------------------
  "ee-incent": {
    minutes: 3,
    blocks: [
      { p: "Much of economics comes down to incentives: the rewards and penalties that motivate people to act a certain way." },
      { p: "Bulk discounts, loyalty points, and free shipping thresholds all nudge you to spend more. Taxes on cigarettes nudge people to smoke less." },
      { term: "Perverse incentive", def: "An incentive that produces the opposite of what was intended, like a reward that accidentally encourages harmful behavior." },
      { callout: "Asking 'who benefits from this' reveals the incentives behind a sales pitch, recommendation, or policy, helping you judge it critically." },
    ],
  },
  "ee-trade": {
    minutes: 3,
    blocks: [
      { p: "Every choice has an opportunity cost: the value of the next best thing you give up, even when no money changes hands." },
      { p: "Spending an evening one way means not spending it another. Even free time and free things carry a cost in forgone alternatives." },
      { term: "Sunk cost", def: "Money already spent that cannot be recovered. Good decisions ignore it and focus only on future costs and benefits." },
      { callout: "Asking 'what else could I do with this money or time' surfaces the opportunity cost and turns an automatic choice into a deliberate one." },
    ],
  },
  "ee-signals": {
    minutes: 3,
    blocks: [
      { p: "Prices are signals. A rising price often means strong demand or limited supply, while a falling price can mean weak demand or excess supply." },
      { p: "Prices coordinate millions of decisions without anyone in charge: high prices attract more production and discourage use, all automatically." },
      { p: "Surge pricing and seasonal discounts are price signals in action, rationing scarce goods and clearing surpluses." },
      { callout: "Holding a price below its market level tends to cause shortages, since more is wanted than is supplied at that low price." },
    ],
  },
  "ee-game": {
    minutes: 3,
    blocks: [
      { p: "Game theory studies decisions that depend on what others do. Your best move can change based on how others are likely to respond." },
      { term: "Prisoner's dilemma", def: "A situation where each person, acting in narrow self interest, ends up worse off than if they had cooperated." },
      { p: "Repeated interactions encourage cooperation, because building a reputation for trust pays off over time." },
      { callout: "Negotiation is strategic too: anticipating the other side's options and responses shapes what offer or stance works best." },
    ],
  },
  "ee-network": {
    minutes: 3,
    blocks: [
      { p: "A network effect means a product becomes more valuable as more people use it, like a messaging app or a marketplace." },
      { p: "This can lead to a few dominant players, since users flock to the biggest networks, making it hard for newcomers to compete." },
      { term: "Switching costs", def: "The effort or loss involved in leaving one product for another, like lost data or learning a new system, which keeps users in place." },
      { callout: "Strong network effects can reduce competition, letting a dominant platform raise prices or cut quality, a downside for consumers." },
    ],
  },
  "ee-extern": {
    minutes: 3,
    blocks: [
      { p: "An externality is a cost or benefit of an action that falls on people not directly involved, like pollution harming a community or a vaccine protecting others." },
      { term: "Tragedy of the commons", def: "A shared resource gets overused because each person gains fully while the cost is spread to all, depleting it for everyone." },
      { p: "Public goods, like clean air or street lighting, are hard to charge for, so markets tend to underprovide them." },
      { callout: "A tax can make a polluter pay for the harm it causes, discouraging the activity and reflecting its true cost to society." },
    ],
  },

  // ----------------------- Digital Money Life ----------------------------
  "dm-subs": {
    minutes: 3,
    blocks: [
      { p: "The subscription model charges a recurring fee for ongoing access instead of a one time purchase. Companies love the predictable revenue." },
      { term: "Subscription creep", def: "Many small recurring charges quietly adding up over time, easy to forget and surprisingly large together." },
      { p: "Free trials that require a card count on you forgetting to cancel. Some services also make canceling deliberately difficult." },
      { callout: "Audit your subscriptions regularly and ask 'do I still use this'. For things you use long term, ownership can beat endless subscriptions." },
    ],
  },
  "dm-atten": {
    minutes: 3,
    blocks: [
      { p: "When a service is free, your attention and data are usually the product, sold to advertisers who fund it." },
      { p: "Features like infinite scroll, autoplay, and notifications are engineered to keep you using the app longer, since more engagement means more ad revenue." },
      { term: "Attention as a scarce resource", def: "You only have so many hours, so countless apps and ads compete fiercely for your limited focus, which is what makes it valuable." },
      { callout: "Turning off nonessential notifications and setting limits helps you direct your attention on purpose instead of being pulled along." },
    ],
  },
  "dm-data": {
    minutes: 3,
    blocks: [
      { p: "Personal data has real value and is often the price you pay for free apps. Companies use it to target ads, improve products, and sometimes sell it." },
      { p: "Apps can collect your activity, location, contacts, and preferences. Reviewing permissions helps you avoid handing over more than needed." },
      { term: "Data broker", def: "A company that collects and sells personal data about people, building profiles for advertisers and others." },
      { callout: "Limit app permissions, use strong unique passwords, and turn on two factor authentication to protect your privacy and security." },
    ],
  },
  "dm-creator": {
    minutes: 3,
    blocks: [
      { p: "The creator economy is people earning by making content and building audiences. They monetize through ads, sponsorships, subscriptions, and products." },
      { p: "Income is often unpredictable, swinging with algorithms and trends. Relying on a single platform is risky, since one rule change can cut earnings overnight." },
      { term: "Owning your audience", def: "Having a direct channel like an email list, not controlled by one platform, so you keep your followers even if a platform changes." },
      { callout: "Earnings are highly skewed: a few creators earn a lot while most earn little, so realism and a backup plan are wise." },
    ],
  },
  "dm-market": {
    minutes: 3,
    blocks: [
      { p: "Online marketplaces use tactics worth recognizing. Dynamic pricing changes prices based on demand and timing, and some sites personalize prices by user." },
      { p: "Reviews are helpful but imperfect, since some are fake or incentivized. Look for patterns like repetitive wording or sudden bursts of reviews." },
      { term: "Reference price", def: "A crossed out higher price that anchors your perception so the current price feels like a deal, even if it is the usual price." },
      { callout: "Compare prices, read varied reviews critically, and pause before buying to resist urgency tactics like countdown timers." },
    ],
  },
  "dm-rights": {
    minutes: 3,
    blocks: [
      { p: "When you 'buy' a digital movie or game, you usually get a license to use it, not full ownership, so it can disappear if a service shuts down." },
      { term: "Terms of service", def: "The rules you agree to when using a service, often long and dense, covering your data, content, and rights." },
      { p: "Credit cards often offer stronger fraud protection than debit for online purchases, and a chargeback lets you dispute a fraudulent or faulty charge." },
      { callout: "Knowing your consumer rights, like returns, chargebacks, and complaint channels, helps you respond when an online deal goes wrong." },
    ],
  },

  // ----------------------- Money and Life --------------------------------
  "ml-rel": {
    minutes: 3,
    blocks: [
      { p: "Money is a common source of relationship conflict, so talking about values and habits early helps partners align." },
      { term: "Financial infidelity", def: "Hiding spending, debt, or accounts from a partner, which can damage trust as much as the financial impact itself." },
      { p: "Couples handle finances in different ways, from fully combined to fully separate to a hybrid. Each balances shared goals against autonomy." },
      { callout: "Honest, ongoing communication about goals is the strongest foundation. Lending to friends or family is best limited to what you can afford to lose." },
    ],
  },
  "ml-trans": {
    minutes: 3,
    blocks: [
      { p: "Big life changes bring new money decisions. Moving out adds rent, utilities, and food, while a first job is the moment to build good habits." },
      { p: "Transitions often carry one time costs and income gaps, so a careful budget and an emergency fund cushion the bumps." },
      { h: "Watch for lifestyle inflation" },
      { p: "A first real income makes it easy to ramp up spending. Holding back and saving the difference early sets a strong foundation." },
      { callout: "Revisit your budget after any major change, since your income and expenses likely shifted." },
    ],
  },
  "ml-give": {
    minutes: 3,
    blocks: [
      { p: "Charitable giving is sharing money, time, or skills to support causes. Many people budget for it to align spending with their values." },
      { term: "Effective giving", def: "Directing donations where they do the most good per dollar, guided by evidence about impact." },
      { p: "You can give meaningfully without much money by donating time or small recurring amounts, which give charities reliable funding." },
      { callout: "Research a charity before donating to confirm it is legitimate and uses funds well. Watch for pressure and vague answers, which signal scams." },
    ],
  },
  "ml-ethics": {
    minutes: 3,
    blocks: [
      { p: "Conscious consumption means considering the impact of what you buy, not just the price. Voting with your wallet supports practices you approve of." },
      { term: "ESG investing", def: "Weighing environmental, social, and governance factors alongside returns, aiming to align money with values." },
      { term: "Greenwashing", def: "Misleading marketing that makes a product or company seem more sustainable than it really is, so claims deserve scrutiny." },
      { callout: "Ethical choices can do real good but involve tradeoffs and require checking that claims are genuine, with credible certifications over slogans." },
    ],
  },
  "ml-well": {
    minutes: 3,
    blocks: [
      { p: "Financial stress can affect sleep, health, and relationships, which is why managing money supports overall wellbeing." },
      { p: "Money relieves stress mainly up to a point: it eases the strain of unmet needs, but beyond a comfortable level adds less to happiness." },
      { h: "What helps" },
      { p: "A sense of control, through budgeting and planning, lowers anxiety even at modest income. Experiences and time for what matters often boost wellbeing more than possessions." },
      { callout: "Defining enough is healthier than endlessly chasing more, which keeps the goalpost moving and prevents contentment." },
    ],
  },
  "ml-talk": {
    minutes: 3,
    blocks: [
      { p: "Money is often treated as taboo, but talking openly allows learning, support, and better decisions." },
      { p: "Discussing salary ranges with peers can reveal whether you are paid fairly. Parents who talk about money openly help children build skills." },
      { h: "Make it productive" },
      { p: "Approach money conversations without judgment, focus on shared goals, and listen to each other's views. Asking questions is a strength, since money is complex." },
      { callout: "Learn from trusted, informed people and credible resources, not strangers promising quick riches." },
    ],
  },
};

export function getLesson(topicId) {
  return lessons[topicId] || null;
}

// A few short bullet points summarizing what a lesson covers, used on the
// public curriculum page so visitors can see the depth before signing in.
export function lessonPreview(topicId, max = 3) {
  const l = lessons[topicId];
  if (!l) return [];
  const points = [];
  l.blocks.forEach((b) => {
    if (b.h) points.push(b.h);
    else if (b.term) points.push(b.term);
  });
  if (points.length < 2) {
    l.blocks.forEach((b) => {
      if (b.callout) points.push(b.callout);
    });
  }
  return points.slice(0, max);
}
