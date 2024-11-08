class Transaction {
    transaction_id: string;
    account_id: string;
    amount: number;
    created_at: string;
  
    constructor(transaction_id: string, account_id: string, amount: number, created_at: string) {
      this.transaction_id = transaction_id;
      this.account_id = account_id;
      this.amount = amount;
      this.created_at = created_at;
    }
  
    static fromJson(json: any): Transaction {
      return new Transaction(
        json.transaction_id,
        json.account_id,
        json.amount,
        json.created_at
      );
    }
  
    toJson(): any {
      return {
        transaction_id: this.transaction_id,
        account_id: this.account_id,
        amount: this.amount,
        created_at: this.created_at
      };
    }
  
    static fromMap(map: Map<string, any>): Transaction {
      return new Transaction(
        map.get('transaction_id'),
        map.get('account_id'),
        map.get('amount'),
        map.get('created_at')
      );
    }
  
    toMap(): Map<string, any> {
      const map = new Map<string, any>();
      map.set('transaction_id', this.transaction_id);
      map.set('account_id', this.account_id);
      map.set('amount', this.amount);
      map.set('created_at', this.created_at);
      return map;
    }
  }

  export default Transaction;
  