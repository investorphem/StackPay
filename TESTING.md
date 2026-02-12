# StackPay Feature Testing Checklist

Use this checklist to verify all features are working correctly.

## 🔗 Wallet Connection

- [ ] Connect wallet button appears on homepage
- [ ] WalletConnect modal opens when clicked
- [ ] Can select and connect with Leather wallet
- [ ] Can select and connect with Xverse wallet
- [ ] Can select and connect with Hiro wallet
- [ ] Connected address displays correctly (truncated)
- [ ] Disconnect button works
- [ ] Connection persists on page refresh

---

## 👔 Employer Features

### Stream Creation
- [ ] Create stream form displays on dashboard
- [ ] Employee address field accepts valid Stacks addresses
- [ ] Employee address field shows error for invalid addresses
- [ ] Rate per block field accepts positive numbers
- [ ] Initial funding field accepts positive numbers
- [ ] Form shows microSTX to STX conversion help text
- [ ] Create button shows loading state during transaction
- [ ] Transaction opens in wallet for approval
- [ ] Toast notification shows on success
- [ ] Toast notification shows on error
- [ ] New stream appears in dashboard after creation
- [ ] Form clears after successful creation

### Stream Management
- [ ] Created streams appear in "As Employer" tab
- [ ] Stream count badge updates correctly
- [ ] Each stream shows correct employer address
- [ ] Each stream shows correct employee address
- [ ] Stream status badge shows "Active" for new streams
- [ ] Fund button appears on employer's streams
- [ ] Cancel button appears on employer's streams

### Funding Streams
- [ ] Click "Add Funds" shows funding form
- [ ] Funding form accepts microSTX amounts
- [ ] Fund transaction opens in wallet
- [ ] Success toast appears after funding
- [ ] Stream balance updates after funding
- [ ] Can fund multiple times
- [ ] Cannot fund inactive streams

### Cancelling Streams
- [ ] Click "Cancel Stream" shows confirmation dialog
- [ ] Can cancel the cancellation
- [ ] Cancel transaction opens in wallet
- [ ] Success toast appears after cancellation
- [ ] Stream status changes to "Inactive"
- [ ] Remaining balance is refunded
- [ ] Cannot cancel already cancelled streams
- [ ] Cannot cancel someone else's stream

---

## 💼 Employee Features

### Viewing Streams
- [ ] Employee streams appear in "As Employee" tab
- [ ] Stream count badge updates correctly
- [ ] Can see rate per block
- [ ] Can see current balance
- [ ] Can see employer address
- [ ] Active/inactive status visible

### Accrued Earnings
- [ ] Accrued earnings box appears on active streams
- [ ] Earnings amount displays in green box
- [ ] Amount is in STX (not microSTX)
- [ ] Amount updates on page refresh
- [ ] Shows "0.000000 STX" when nothing accrued
- [ ] Does not show on inactive streams

### Withdrawing
- [ ] Withdraw button appears on employee's streams
- [ ] Withdraw button disabled when balance is 0
- [ ] Withdraw button shows loading state during transaction
- [ ] Transaction opens in wallet
- [ ] Success toast appears after withdrawal
- [ ] Stream balance decreases
- [ ] Last withdrawal block updates
- [ ] Accrued amount resets after withdrawal
- [ ] Can withdraw multiple times
- [ ] Cannot withdraw from inactive streams
- [ ] Cannot withdraw from someone else's stream

---

## 📊 Dashboard & Analytics

### Analytics Cards
- [ ] "Total Streams" card shows correct count
- [ ] Active streams count is accurate
- [ ] "As Employer" card shows correct stream count
- [ ] Total funded amount is accurate
- [ ] "As Employee" card shows correct stream count
- [ ] Total earnable amount is accurate
- [ ] "Avg Rate/Block" calculates correctly
- [ ] All cards have gradient backgrounds
- [ ] Cards are responsive on mobile

### Filtering
- [ ] "All Streams" tab shows all streams
- [ ] "As Employer" tab shows only employer streams
- [ ] "As Employee" tab shows only employee streams
- [ ] Count badges update when switching tabs
- [ ] Active tab has highlighted color
- [ ] Filters work with empty states

### Data Refresh
- [ ] Dashboard auto-refreshes every 30 seconds
- [ ] Block height updates on refresh
- [ ] Stream data updates on refresh
- [ ] Manual refresh works (reload page)
- [ ] No duplicate streams appear

---

## 🎨 UI/UX Elements

### Toast Notifications
- [ ] Success toasts are green
- [ ] Error toasts are red
- [ ] Toasts slide in from right
- [ ] Toasts auto-dismiss after 5 seconds
- [ ] Can manually close toast with X button
- [ ] Only one toast shows at a time
- [ ] Toast doesn't block important content

### Empty States
- [ ] "No streams found" message shows when appropriate
- [ ] Helpful context message appears
- [ ] Empty state styling is consistent
- [ ] Different messages for different filters

### Loading States
- [ ] Create button shows "Creating Stream..."
- [ ] Withdraw button shows "Withdrawing..."
- [ ] Cancel button shows "Cancelling..."
- [ ] Fund button shows "Adding..."
- [ ] Buttons are disabled during loading

### Responsive Design
- [ ] Homepage looks good on mobile
- [ ] Dashboard is usable on mobile
- [ ] Forms are easy to fill on mobile
- [ ] Analytics cards stack vertically on mobile
- [ ] Stream cards are readable on mobile
- [ ] No horizontal scrolling required

---

## 🏠 Landing Page

### Content
- [ ] Hero section displays correctly
- [ ] Gradient text renders properly
- [ ] "Launch App" button works
- [ ] Connect wallet button in header works
- [ ] Feature grid shows 3 features
- [ ] "How It Works" section is visible
- [ ] Employer steps are listed
- [ ] Employee steps are listed
- [ ] Footer is present

### Design
- [ ] Background gradient is smooth
- [ ] Cards have backdrop blur effect
- [ ] Hover effects work on buttons
- [ ] Text is readable on all backgrounds
- [ ] Emojis display correctly (💰, 🔒, 🌐)

---

## ⚙️ Technical Checks

### Environment
- [ ] `.env.local` file exists
- [ ] `NEXT_PUBLIC_WC_PROJECT_ID` is set
- [ ] `NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS` is set
- [ ] `NEXT_PUBLIC_NETWORK` is set (testnet/mainnet)
- [ ] Environment variables load correctly

### Network
- [ ] Correct network is used (check URL in console)
- [ ] Block height fetches successfully
- [ ] Contract calls work
- [ ] Read-only functions work
- [ ] No CORS errors in console

### Error Handling
- [ ] Invalid addresses show error messages
- [ ] Failed transactions show error toast
- [ ] Missing env vars are logged to console
- [ ] Network errors are caught and displayed
- [ ] No unhandled promise rejections

### Browser Console
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] Network requests succeed
- [ ] State updates are logged (if dev mode)

---

## 🔐 Security Checks

- [ ] No private keys in code
- [ ] No hardcoded sensitive data
- [ ] All transactions require wallet approval
- [ ] Can only modify own streams
- [ ] Input validation prevents injection
- [ ] Amounts are properly sanitized

---

## 📱 Cross-browser Testing

### Desktop
- [ ] Chrome works
- [ ] Firefox works
- [ ] Safari works
- [ ] Edge works

### Mobile
- [ ] iOS Safari works
- [ ] Android Chrome works
- [ ] WalletConnect works on mobile

---

## 🚀 Deployment Checks

- [ ] `npm run build` succeeds
- [ ] `npm run start` works after build
- [ ] No build warnings
- [ ] All pages accessible
- [ ] Static assets load correctly
- [ ] Environment variables work in production

---

## 📋 Final Verification

- [ ] All employer features tested ✅
- [ ] All employee features tested ✅
- [ ] All UI components tested ✅
- [ ] All edge cases handled ✅
- [ ] Documentation is complete ✅
- [ ] Code is production-ready ✅

---

**Testing Date**: ______________  
**Tested By**: ______________  
**Environment**: [ ] Testnet [ ] Mainnet  
**Status**: [ ] Pass [ ] Fail  

**Notes**:
_______________________________________________________
_______________________________________________________
_______________________________________________________
