import { Activity } from './Activity';
import { LocalDateTime } from '@js-joda/core';

export class ActivityWindow {
  readonly #activities: Activity[] = [];

  getStartTimestamp(): LocalDateTime {
    if (this.#activities.length === 0) {
      throw new Error('ActivityWindow has no activities');
    }
    const result = this.#activities.reduce((a, b) =>
      a.timestamp.compareTo(b.timestamp) > 0 ? a : b,
    );
    return result.timestamp;
  }
}
