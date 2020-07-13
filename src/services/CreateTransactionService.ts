import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

import GetBalanceService from './GetBalanceService';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Incorrect entry type');
    }

    // const transactionsRepository = new TransactionsRepository();

    const getBalance = new GetBalanceService(this.transactionsRepository);

    const { total } = getBalance.execute();

    if (value > total && type === 'outcome') {
      throw Error('Insuficient resources');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
