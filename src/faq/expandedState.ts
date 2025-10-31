import { FAQState } from "./faqState";
import { CollapsedState } from "./collapsedState";

export class ExpandedState implements FAQState {
  toggle(item: any): void {
    item.setState(new CollapsedState());
  }

  isExpanded(): boolean {
    return true;
  }
}
