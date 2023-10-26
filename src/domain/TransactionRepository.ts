import Transaction from "./Transaction";

export default interface TransactionRepository {
  store(tx: Transaction): void;
}
