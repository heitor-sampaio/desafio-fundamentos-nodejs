import TransactionsRepository from '../repositories/TransactionsRepository';
import Balance from '../models/Balance';

class GetBalance {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    const transactions = this.transactionsRepository.all();

    const income = transactions.reduce((total, currentTransaction) => {
      if (currentTransaction.type === 'income') {
        return total + currentTransaction.value;
      }
      return total;
    }, 0);

    const outcome = transactions.reduce((total, currentTransaction) => {
      if (currentTransaction.type === 'outcome') {
        return total + currentTransaction.value;
      }
      return total;
    }, 0);

    const total = income - outcome;

    const balance = this.transactionsRepository.getBalance({
      income,
      outcome,
      total,
    });

    return balance;
  }
}

export default GetBalance;
