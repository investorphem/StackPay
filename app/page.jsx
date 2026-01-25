import Link from "next/link";
import ConnectWallet from "../components/ConnectWallet";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            StackPay
          </h1>
          <ConnectWallet />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Decentralized Payroll
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Stream salaries in real-time on the Stacks blockchain
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            StackPay enables companies, DAOs, and founders to stream salaries to contributors 
            using block-based accrual. Employees can withdraw earned wages at any time.
          </p>
          
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold text-lg transition shadow-lg"
          >
            Launch App
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-6 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Real-time Streaming</h3>
            <p className="text-gray-400">
              Salaries accrue every block. Withdraw whenever you want.
            </p>
          </div>
          
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-6 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Non-Custodial</h3>
            <p className="text-gray-400">
              Smart contracts handle everything. No middlemen, no custody.
            </p>
          </div>
          
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-6 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-2">WalletConnect</h3>
            <p className="text-gray-400">
              Connect seamlessly with Leather, Xverse, Hiro, and more.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur rounded-lg p-8 border border-slate-700">
          <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-blue-400 mb-2">For Employers</h4>
              <ol className="space-y-2 text-gray-300">
                <li>1. Connect your wallet</li>
                <li>2. Create a salary stream with employee address and rate</li>
                <li>3. Fund the stream with STX</li>
                <li>4. Top up or cancel anytime</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-bold text-purple-400 mb-2">For Employees</h4>
              <ol className="space-y-2 text-gray-300">
                <li>1. Connect your wallet</li>
                <li>2. View your active streams</li>
                <li>3. See real-time accrued earnings</li>
                <li>4. Withdraw whenever you want</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Built on Stacks • Powered by Clarity Smart Contracts</p>
        </div>
      </div>
    </main>
  );
}