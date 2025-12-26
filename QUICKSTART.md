# StackPay Quick Start Guide

Welcome to StackPay! This guide will help you get the application running locally.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** version 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A **WalletConnect Project ID** (required for wallet connections)
- A **Stacks wallet** (Leather, Xverse, or Hiro recommended)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Get a WalletConnect Project ID

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up for a free account
3. Create a new project
4. Copy your Project ID

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
NEXT_PUBLIC_STACKPAY_CONTRACT_NAME=stackpay
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id_here
```

**Replace `your_walletconnect_project_id_here` with your actual WalletConnect Project ID!**

> **Note**: The contract address above is a placeholder. Replace it with your deployed contract address on testnet or mainnet.

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 First Steps in the App

### For Employers

1. **Connect Your Wallet**
   - Click "Connect Wallet" on the homepage
   - Select your Stacks wallet (Leather, Xverse, or Hiro)
   - Approve the connection

2. **Navigate to Dashboard**
   - Click "Launch App" or go to `/dashboard`

3. **Create Your First Stream**
   - Fill in the employee's Stacks address
   - Set the rate per block (in microSTX)
   - Add initial funding (in microSTX)
   - Click "Create Stream"
   - Approve the transaction in your wallet

4. **Manage Streams**
   - View your streams in the "As Employer" tab
   - Add funds to active streams
   - Cancel streams if needed

### For Employees

1. **Connect Your Wallet**
   - Same process as employers

2. **View Your Streams**
   - Go to Dashboard
   - Click "As Employee" tab
   - See streams where you're the recipient

3. **Withdraw Earnings**
   - Check your accrued earnings (shown in green)
   - Click "Withdraw Earnings"
   - Approve the transaction
   - Funds are sent to your wallet!

---

## 💡 Understanding Rates and Funding

### MicroSTX vs STX
- 1 STX = 1,000,000 microSTX
- All contract values use microSTX
- The UI shows conversions for convenience

### Rate Per Block
- This is how much the employee earns per Stacks block
- Example: Rate of 100 microSTX = 0.0001 STX per block
- Blocks on Stacks occur approximately every 10 minutes

### Calculating Payroll

**Example:**
- Rate: 1,000,000 microSTX/block (1 STX/block)
- Blocks per day: ~144 (10 min/block × 6 blocks/hour × 24 hours)
- Daily salary: 144 STX
- Monthly salary (30 days): 4,320 STX

**To pay someone 1000 STX/month:**
- Monthly blocks: ~4,320
- Rate per block: 1,000 ÷ 4,320 = ~0.23148 STX = 231,480 microSTX

---

## 🔧 Troubleshooting

### Wallet Won't Connect
- Make sure you have a Stacks wallet installed
- Check that your WalletConnect Project ID is correct
- Try refreshing the page
- Check browser console for errors

### Transactions Failing
- Ensure you have enough STX for gas fees
- Verify the employee address is valid
- Check that funding amount > 0
- Make sure you're connected to the right network (testnet/mainnet)

### Streams Not Showing
- Verify contract address is correct in `.env.local`
- Check you're on the right network
- Refresh the page or wait for the 30-second auto-refresh

### Environment Variables Not Loading
- File must be named `.env.local` (not `.env`)
- Restart the dev server after changing env vars
- All public vars must start with `NEXT_PUBLIC_`

---

## 🌐 Network Configuration

### Testnet (Default)
```env
NEXT_PUBLIC_NETWORK=testnet
```
- Use for testing and development
- Get testnet STX from [faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet)
- No real money involved

### Mainnet (Production)
```env
NEXT_PUBLIC_NETWORK=mainnet
```
- Use for real payroll
- Requires real STX
- Double-check all addresses and amounts!

---

## 📚 Additional Resources

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language Guide](https://docs.stacks.co/clarity/)
- [WalletConnect Docs](https://docs.walletconnect.com/)
- [Leather Wallet](https://leather.io/)
- [Xverse Wallet](https://www.xverse.app/)
- [Hiro Wallet](https://wallet.hiro.so/)

---

## 🤝 Need Help?

- Check [ENHANCEMENTS.md](ENHANCEMENTS.md) for feature details
- Review [README.md](README.md) for architecture overview
- See [CHANGELOG.md](CHANGELOG.md) for version history

---

## ⚡ Pro Tips

1. **Save frequent addresses**: Keep a list of employee addresses for quick stream creation
2. **Monitor block height**: Watch the dashboard to see block progression
3. **Test on testnet first**: Always test new features on testnet before mainnet
4. **Keep streams funded**: Monitor balances to ensure continuous payments
5. **Auto-refresh**: The dashboard refreshes every 30 seconds automatically

---

**Happy streaming! 🎉**
