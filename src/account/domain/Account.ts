import { Money } from './Money';
import { ActivityWindow } from './ActivityWindow';

export class Account {
  readonly #id: AccountId;
  readonly #baselineBalance: Money;
  readonly #activityWindow: ActivityWindow;

  get id(): AccountId {
    return this.#id;
  }

  get baselineBalance(): Money {
    return this.#baselineBalance;
  }

  get activityWindow(): ActivityWindow {
    return this.#activityWindow;
  }
}

export class AccountId {
  #id: number;

  get id(): number {
    return this.#id;
  }
}
