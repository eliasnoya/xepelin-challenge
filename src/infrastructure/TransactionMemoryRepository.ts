import Transaction from "../domain/Transaction";
import TransactionRepository from "../domain/TransactionRepository";
import { Database } from "../shared/Stores";

export default class TransactionMemoryRepository
  implements TransactionRepository
{
  store(tx: Transaction) {
    Database.push(tx);
    // handle errors here sometime
  }
}
