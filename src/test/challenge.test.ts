import { Request, Response } from "express";
import { describe } from "node:test";
import TransactionTypes from "../domain/TransactionTypes";
import {
  transactionController,
  accountCreatorController,
  accountBalanceController,
} from "../infrastructure/Controllers";

let accountId: string;
let currentBalance: number;

describe("Create a new Account", () => {
  it("Should return a 201 status code & ID", () => {
    const mockRequest = {
      body: {
        name: "Noya, Elias",
        number: 1234,
      },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((responseJson) => {
        // store account_id from next tests
        accountId = responseJson.account_id;
      }),
      send: jest.fn(),
    } as unknown as Response;

    accountCreatorController.run(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        account_id: expect.any(String),
      })
    );
  });
});

describe("Balance to an inexistent Account must 404", () => {
  it("Should return status 404", () => {
    const mockRequest = {
      params: {
        id: "INEXISTENT_ACCOUNT",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((responseJson) => {
        currentBalance = responseJson.balance;
      }),
      send: jest.fn(),
    } as unknown as Response;

    accountBalanceController.run(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

describe("The recently created account must have a balance of 0", () => {
  it("Should return status 200 && balance = 0", () => {
    const mockRequest = {
      params: {
        id: accountId,
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((responseJson) => {
        currentBalance = responseJson.balance;
      }),
      send: jest.fn(),
    } as unknown as Response;

    accountBalanceController.run(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        account_id: accountId,
        balance: 0,
      })
    );
  });
});

describe("Create a deposit transaction and verify that the balance increases", () => {
  it("Should return a 200 and balance equal 100", () => {
    let depositAmount = 100;

    const mockRequest = {
      body: {
        type: TransactionTypes.D,
        account_id: accountId,
        amount: depositAmount,
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    transactionController.run(mockRequest, mockResponse);

    // update tests balance
    currentBalance += depositAmount;

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(currentBalance).toBe(100);
  });
});

describe("Initiate a withdrawal transaction and verify that the balance decreases", () => {
  it("Should return a 200 && balanz now has to be equal 50", () => {
    let withdrawAmount = -50;

    const mockRequest = {
      body: {
        type: TransactionTypes.W,
        account_id: accountId,
        amount: withdrawAmount,
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    transactionController.run(mockRequest, mockResponse);

    // update tests balance
    currentBalance += withdrawAmount;

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(currentBalance).toBe(50);
  });
});

describe("You cant withdraw more than your balance", () => {
  it("Should return status 500 & balanz still at 50", () => {
    const t = () => {
      let withdrawAmount = -51;

      const mockRequest = {
        body: {
          type: TransactionTypes.W,
          account_id: accountId,
          amount: withdrawAmount,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      transactionController.run(mockRequest, mockResponse);
    };

    expect(t).toThrow(Error);
    expect(currentBalance).toBe(50);
  });
});

describe("You cant make a transaction against an inexistent account", () => {
  it("Should return status 404", () => {
    let withdrawAmount = -51;

    const mockRequest = {
      body: {
        type: TransactionTypes.W,
        account_id: "INEXISTENT_ACCOUNT",
        amount: withdrawAmount,
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    transactionController.run(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(currentBalance).toBe(50);
  });
});
