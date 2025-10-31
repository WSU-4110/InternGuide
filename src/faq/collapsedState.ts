import { FAQState } from "./faqState";
import { ExpandedState } from "./expandedState";

export class CollapsedState implements FAQState {
  toggle(item: any): void {
    item.setState(new ExpandedState());
  }

  isExpanded(): boolean {
    return false;
  }
}
