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

## How Salary Streaming Works

Stacks does not support continuous time, so StackPay uses block height as a deterministic time source.

Salary accrual is calculated as:

(current block − last withdrawal block) × rate per block

Employees can withdraw their accumulated salary at any point while the stream remains active.

---

## Features

**Employer capabilities:**
- Create salary streams with custom rates
- Fund and top up active streams
- Cancel salary streams with automatic refunds
- View transparent on-chain payroll activity
- Track streams with analytics dashboard
- Interactive form-based stream creation

**Employee capabilities:**
- Earn salary in real time (block-based)
- Withdraw salary on demand
- View accrued earnings in real-time
- Authenticate via wallet connection
- Filter and view all personal streams
- No employer custody of funds

**Protocol characteristics:**
- Non-custodial smart contracts
- Block-based salary calculation
- Deterministic and auditable logic
- WalletConnect-powered access control
- Role-based filtering (Employer/Employee views)
- Professional toast notification system
- Real-time analytics and statistics

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

## WalletConnect Integration Details

Wallet connections are handled through the Stacks Connect SDK, which supports WalletConnect-compatible Stacks wallets.

Connection flow:
1. User initiates wallet connection from the interface
2. WalletConnect modal opens
3. User selects a supported wallet
4. Session metadata is established
5. All contract calls require explicit wallet approval

This setup exposes wallet session metadata and emits WalletConnect events that can be externally observed.

---

## Smart Contract Overview

The payroll logic is implemented in a Clarity smart contract.

**Core functions include:**
- `create-stream`: Initialize a new salary stream
- `withdraw`: Withdraw earned salary
- `fund-stream`: Add funds to an existing stream
- `cancel-stream`: Terminate a stream and refund balance

**Read-only functions:**
- `get-stream`: Fetch specific stream details
- `get-accrued-amount`: Calculate real-time earnings
- `get-all-streams`: List all active streams

Each stream tracks:
- Employer address
- Employee address
- Rate per block
- Last withdrawal block
- Remaining balance
- Stream status

All state changes are recorded on-chain and can be indexed externally.

---

## Project Structure

```
stackpay/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard page with filters
│   ├── page.jsx           # Landing page
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ConnectWallet.jsx  # WalletConnect integration
│   ├── CreateStream.jsx   # Stream creation form
│   ├── StreamCard.jsx     # Stream display and actions
│   ├── StreamAnalytics.jsx # Analytics dashboard
│   └── Toast.jsx          # Notification system
├── hooks/                 # Custom React hooks
│   └── useToast.js        # Toast notification hook
├── lib/                   # Utilities and configuration
│   ├── contract.js        # Contract interaction helpers
│   └── stacks.js          # Network configuration
├── contracts/             # Clarity smart contracts
│   └── stackpay.clar      # Main payroll contract
├── public/                # Static assets
├── .env.example           # Environment template
├── README.md              # This file
├── ENHANCEMENTS.md        # Enhancement documentation
└── package.json           # Dependencies
```

---

## Installation and Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A WalletConnect Project ID (get one at https://cloud.walletconnect.com/)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd stackpay
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env.local` and fill in your values:
```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_STACKPAY_CONTRACT_NAME=stackpay
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at http://localhost:3000

---

## Deployment

- Frontend can be deployed on Vercel or Netlify
- Smart contracts are deployed using Clarinet or the Stacks CLI
- WalletConnect works automatically in development and production environments

---

## Observability and Indexing

StackPay is designed to be easily observable through:
- Wallet connection metadata
- WalletConnect session events
- On-chain contract calls
- Stream creation and withdrawal transactions

This enables reliable detection of wallet integrations and payroll activity.

---

## Security

- No private keys are stored
- Funds are held entirely in smart contracts
- Explicit wallet approvals are required for all actions
- Deterministic Clarity execution ensures predictable behavior

---

## Future Enhancements

**Potential features:**
- Transaction history and event tracking
- SIP-010 token salary streams
- Batch stream creation
- DAO payroll modules
- Vesting cliffs and schedules
- Email/push notifications
- CSV export for accounting
- Stream templates
- Gas estimation
- Mobile app

See [ENHANCEMENTS.md](ENHANCEMENTS.md) for detailed information about recent improvements.

---

## License

MIT License