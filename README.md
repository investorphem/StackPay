# StackPay — Decentralized Payroll & Salary Streaming on Stacks

StackPay is a decentralized payroll and salary streaming application built on the Stacks blockchain.  
It enables companies, DAOs, and founders to stream salaries to contributors in real time using block-based accrual, with full support for WalletConnect-enabled Stacks wallets.

Employees can withdraw earned wages at any time, while employers manage payroll in a transparent and non-custodial way.

---

## Wallet Connectivity

StackPay integrates WalletConnect to enable seamless wallet connections across desktop and mobile environments.

Supported wallets include:
- Leather
- Xverse
- Hiro
- Any Stacks wallet compatible with WalletConnect

WalletConnect provides:
- Mobile-first access
- Multi-wallet compatibility
- Secure, non-custodial authentication
- Standardized wallet connection flow

Wallet connections are implemented using the Stacks Connect SDK with built-in WalletConnect support.

---

## StackPay SDK (npm Package)

Developers and merchants can integrate StackPay functionality directly using the **StackPay SDK**.

### Install

```bash
npm install stacks-pay-sdk
```

### Usage Example

```javascript
const StackPay = require("stacks-pay-sdk");

// Create an invoice
const invoice = StackPay.createInvoice({
  amount: 1000000,
  merchantAddress: "SP1234567890",
  memo: "Salary Payment"
});

// Trigger payment via wallet
StackPay.payWithSTX({
  amount: invoice.amount,
  recipient: invoice.merchantAddress,
  memo: invoice.memo
});

// Verify payment
(async () => {
  const success = await StackPay.verifyPayment("TXID_HERE");
  console.log("Payment successful?", success);
})();
```

### Quick 1-Line Pay Button

```html
<button id="payButton">Pay with STX</button>

<script type="module">
import { createInvoice, payWithSTX } from "https://cdn.jsdelivr.net/npm/stacks-pay-sdk/dist/index.js";

document.getElementById("payButton").addEventListener("click", () => {
  const invoice = createInvoice({ amount: 1000000, merchantAddress: "SP1234567890" });
  payWithSTX({ amount: invoice.amount, recipient: invoice.merchantAddress });
});
</script>
```

### Links

- npm Package: [NPM package](https://www.npmjs.com/package/stacks-pay-sdk)  
- GitHub Repo: [REPO link](https://github.com/investorphem/StackPay)

---

## How Salary Streaming Works

Stacks does not support continuous time, so StackPay uses block height as a deterministic time source.

Salary accrual is calculated as:

```
(current block − last withdrawal block) × rate per block
```

Employees can withdraw their accumulated salary at any point while the stream remains active.

---

## Features

Employer capabilities:
- Create salary streams
- Fund and top up active streams
- Cancel salary streams
- View transparent on-chain payroll activity

Employee capabilities:
- Earn salary in real time
- Withdraw salary on demand
- Authenticate via wallet connection
- No employer custody of funds

Protocol characteristics:
- Non-custodial smart contracts
- Block-based salary calculation
- Deterministic and auditable logic
- WalletConnect-powered access control

---

## Tech Stack

- Blockchain: Stacks
- Smart Contracts: Clarity
- Wallet Integration: WalletConnect
- Frontend: Next.js (App Router)
- Styling: Tailwind CSS
- Wallet SDK: @stacks/connect
- Transactions: @stacks/transactions

---

## License

MIT License