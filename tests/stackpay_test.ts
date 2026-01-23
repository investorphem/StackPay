/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  StackPay — Payroll & Salary Streaming Test Suite                       ║
 * ║  Comprehensive tests for the StackPay payroll streaming contract        ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

import { describe, it, expect } from "vitest";
import { Cl, ClarityType } from "@stacks/transactions";

// Test accounts from simnet
const accounts = simnet.getAccounts();
const employer = accounts.get("deployer")!;
const employee1 = accounts.get("wallet_1")!;
const employee2 = accounts.get("wallet_2")!;
const employee3 = accounts.get("wallet_3")!;

const contractName = "stackpay";

// Helper to extract response values
function getResponseOk(result: any) {
  if (result.result.type === ClarityType.ResponseOk) {
    return result.result.value;
  }
  throw new Error(`Expected ResponseOk, got ${result.result.type}`);
}

function getResponseErr(result: any) {
  if (result.result.type === ClarityType.ResponseErr) {
    return result.result.value;
  }
  throw new Error(`Expected ResponseErr, got ${result.result.type}`);
}

// ════════════════════════════════════════════════════════════════════════════
// STREAM CREATION TESTS
// ════════════════════════════════════════════════════════════════════════════

describe("Stream Creation", () => {
  it("should create a salary stream successfully", () => {
    const ratePerBlock = 1000; // 1000 microSTX per block
    const initialFund = 10000000; // 10 STX

    const result = simnet.callPublicFn(
      contractName,
      "create-stream",
      [
        Cl.principal(employee1),
        Cl.uint(ratePerBlock),
        Cl.uint(initialFund)
      ],
      employer
    );

    expect(result.result).toBeOk(Cl.uint(1));

    // Verify stream was created
    const streams = simnet.callReadOnlyFn(contractName, "get-all-streams", [], employer);
    expect(streams.result.list.length).toBe(1);
  });

  it("should create multiple streams with different IDs", () => {
    // Create first stream
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Create second stream
    const result = simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee2), Cl.uint(2000), Cl.uint(20000000)],
      employer
    );

    expect(result.result).toBeOk(Cl.uint(2));

    // Verify both streams exist
    const streams = simnet.callReadOnlyFn(contractName, "get-all-streams", [], employer);
    expect(streams.result.list.length).toBe(2);
  });

  it("should fail to create stream with insufficient funds", () => {
    const result = simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(1000000000000)], // More than account has
      employer
    );

    expect(result.result).toBeErr(); // Should fail due to insufficient funds
  });
});

// ════════════════════════════════════════════════════════════════════════════
// WITHDRAWAL TESTS
// ════════════════════════════════════════════════════════════════════════════

describe("Salary Withdrawal", () => {
  it("should allow employee to withdraw accrued salary", () => {
    // Create stream
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Advance blocks to accrue salary (simulate time passing)
    simnet.mineEmptyBlocks(10);

    // Withdraw
    const result = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(1)],
      employee1
    );

    expect(result.result).toBeOk(Cl.uint(10000)); // 10 blocks * 1000 microSTX/block
  });

  it("should prevent non-employee from withdrawing", () => {
    // Create stream for employee1
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Try to withdraw as employee2
    const result = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(1)],
      employee2
    );

    expect(result.result).toBeErr(Cl.uint(1));
  });

  it("should limit withdrawal to available balance", () => {
    // Create stream with small balance
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000000), Cl.uint(5000000)], // High rate, low balance
      employer
    );

    // Advance many blocks
    simnet.mineEmptyBlocks(100);

    // Withdraw - should only get the available balance
    const result = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(1)],
      employee1
    );

    expect(result.result).toBeOk(Cl.uint(5000000)); // Full balance, not the accrued amount
  });

  it("should fail to withdraw from non-existent stream", () => {
    const result = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(999)],
      employee1
    );

    expect(result.result).toBeErr(Cl.uint(2));
  });
});

// ════════════════════════════════════════════════════════════════════════════
// STREAM CANCELLATION TESTS
// ════════════════════════════════════════════════════════════════════════════

describe("Stream Cancellation", () => {
  it("should allow employer to cancel stream and refund balance", () => {
    // Create stream
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Some withdrawal happens
    simnet.mineEmptyBlocks(5);
    simnet.callPublicFn(contractName, "withdraw", [Cl.uint(1)], employee1);

    // Cancel stream
    const result = simnet.callPublicFn(
      contractName,
      "cancel-stream",
      [Cl.uint(1)],
      employer
    );

    expect(result.result).toBeOk(Cl.bool(true));

    // Verify stream is inactive
    const streams = simnet.callReadOnlyFn(contractName, "get-all-streams", [], employer);
    expect(streams.result.list.length).toBe(0); // Should not appear in active streams
  });

  it("should prevent non-employer from cancelling stream", () => {
    // Create stream
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Try to cancel as employee
    const result = simnet.callPublicFn(
      contractName,
      "cancel-stream",
      [Cl.uint(1)],
      employee1
    );

    expect(result.result).toBeErr(Cl.uint(3));
  });

  it("should fail to cancel non-existent stream", () => {
    const result = simnet.callPublicFn(
      contractName,
      "cancel-stream",
      [Cl.uint(999)],
      employer
    );

    expect(result.result).toBeErr(Cl.uint(4));
  });
});

// ════════════════════════════════════════════════════════════════════════════
// STREAM TOP-UP TESTS
// ════════════════════════════════════════════════════════════════════════════

describe("Stream Top-up", () => {
  it("should allow employer to add funds to existing stream", () => {
    // Create stream
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Top up the stream
    const result = simnet.callPublicFn(
      contractName,
      "fund-stream",
      [Cl.uint(1), Cl.uint(5000000)],
      employer
    );

    expect(result.result).toBeOk(Cl.bool(true));

    // Verify balance increased (this would need a read function to check)
  });

  it("should prevent non-employer from topping up stream", () => {
    // Create stream
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Try to top up as employee
    const result = simnet.callPublicFn(
      contractName,
      "fund-stream",
      [Cl.uint(1), Cl.uint(5000000)],
      employee1
    );

    expect(result.result).toBeErr(Cl.uint(5)); // Assuming error code for unauthorized
  });
});

// ════════════════════════════════════════════════════════════════════════════
// BULK OPERATIONS TESTS
// ════════════════════════════════════════════════════════════════════════════

describe("Bulk Operations", () => {
  it("should create multiple streams in bulk", () => {
    const streams = [
      { employee: employee1, rate: 1000, fund: 10000000 },
      { employee: employee2, rate: 2000, fund: 15000000 },
      { employee: employee3, rate: 1500, fund: 12000000 }
    ];

    const result = simnet.callPublicFn(
      contractName,
      "create-multiple-streams",
      [Cl.list(streams.map(s => Cl.tuple({
        employee: Cl.principal(s.employee),
        rate: Cl.uint(s.rate),
        fund: Cl.uint(s.fund)
      })))],
      employer
    );

    expect(result.result).toBeOk(Cl.list([
      Cl.uint(1),
      Cl.uint(2),
      Cl.uint(3)
    ]));

    // Verify streams were created
    const allStreams = simnet.callReadOnlyFn(contractName, "get-all-streams", [], employer);
    expect(allStreams.result.list.length).toBe(3);
  });

  it("should allow bulk withdrawal from multiple streams", () => {
    // Create multiple streams
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(2000), Cl.uint(20000000)],
      employer
    );

    // Advance blocks
    simnet.mineEmptyBlocks(5);

    // Bulk withdraw
    const result = simnet.callPublicFn(
      contractName,
      "withdraw-multiple",
      [Cl.list([Cl.uint(1), Cl.uint(2)])],
      employee1
    );

    expect(result.result).toBeOk(Cl.list([
      Cl.uint(5000), // 5 * 1000
      Cl.uint(10000) // 5 * 2000
    ]));
  });

  it("should handle mixed success/failure in bulk withdrawal", () => {
    // Create one stream for employee1
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // Advance blocks
    simnet.mineEmptyBlocks(5);

    // Try to withdraw from existing and non-existing streams
    const result = simnet.callPublicFn(
      contractName,
      "withdraw-multiple",
      [Cl.list([Cl.uint(1), Cl.uint(999)])],
      employee1
    );

    expect(result.result).toBeOk(Cl.list([
      Cl.uint(5000), // Success
      Cl.uint(2)     // Error code for non-existent stream
    ]));
  });

  it("should allow employer bulk operations", () => {
    const operations = [
      { type: "create", employee: employee1, rate: 1000, fund: 10000000 },
      { type: "create", employee: employee2, rate: 2000, fund: 15000000 },
      { type: "fund", streamId: 1, amount: 5000000 }
    ];

    const result = simnet.callPublicFn(
      contractName,
      "execute-bulk-operations",
      [Cl.list(operations.map(op => Cl.tuple({
        type: Cl.stringUtf8(op.type),
        employee: op.employee ? Cl.principal(op.employee) : Cl.principal(employer),
        rate: op.rate ? Cl.uint(op.rate) : Cl.uint(0),
        fund: op.fund ? Cl.uint(op.fund) : Cl.uint(0),
        streamId: op.streamId ? Cl.uint(op.streamId) : Cl.uint(0),
        amount: op.amount ? Cl.uint(op.amount) : Cl.uint(0)
      })))],
      employer
    );

    expect(result.result).toBeOk(Cl.list([
      Cl.uint(1), // Stream ID from create
      Cl.uint(2), // Stream ID from create
      Cl.bool(true) // Success from fund
    ]));
  });
});

// ════════════════════════════════════════════════════════════════════════════
// INTEGRATION TESTS
// ════════════════════════════════════════════════════════════════════════════

describe("Integration Scenarios", () => {
  it("should handle complete payroll workflow", () => {
    // 1. Create multiple streams
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(10000000)],
      employer
    );

    // 2. Advance time (blocks)
    simnet.mineEmptyBlocks(10);

    // 3. Employee withdraws salary
    const withdrawResult = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(1)],
      employee1
    );
    expect(withdrawResult.result).toBeOk(Cl.uint(10000));

    // 4. Employer tops up
    simnet.callPublicFn(
      contractName,
      "fund-stream",
      [Cl.uint(1), Cl.uint(5000000)],
      employer
    );

    // 5. More time passes
    simnet.mineEmptyBlocks(5);

    // 6. Another withdrawal
    const secondWithdraw = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(1)],
      employee1
    );
    expect(secondWithdraw.result).toBeOk(Cl.uint(5000));

    // 7. Eventually cancel
    simnet.callPublicFn(
      contractName,
      "cancel-stream",
      [Cl.uint(1)],
      employer
    );

    // Verify stream is cancelled
    const streams = simnet.callReadOnlyFn(contractName, "get-all-streams", [], employer);
    expect(streams.result.list.length).toBe(0);
  });

  it("should handle multiple employees with different rates", () => {
    // Create streams for different employees
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee1), Cl.uint(1000), Cl.uint(50000000)],
      employer
    );
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee2), Cl.uint(2000), Cl.uint(75000000)],
      employer
    );
    simnet.callPublicFn(
      contractName,
      "create-stream",
      [Cl.principal(employee3), Cl.uint(1500), Cl.uint(60000000)],
      employer
    );

    // Advance time
    simnet.mineEmptyBlocks(20);

    // All employees withdraw
    const withdraw1 = simnet.callPublicFn(contractName, "withdraw", [Cl.uint(1)], employee1);
    const withdraw2 = simnet.callPublicFn(contractName, "withdraw", [Cl.uint(2)], employee2);
    const withdraw3 = simnet.callPublicFn(contractName, "withdraw", [Cl.uint(3)], employee3);

    expect(withdraw1.result).toBeOk(Cl.uint(20000)); // 20 * 1000
    expect(withdraw2.result).toBeOk(Cl.uint(40000)); // 20 * 2000
    expect(withdraw3.result).toBeOk(Cl.uint(30000)); // 20 * 1500
  });
});
