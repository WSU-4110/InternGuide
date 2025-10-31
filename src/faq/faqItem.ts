import { FAQState } from "./faqState";
import { CollapsedState } from "./collapsedState";

export class FAQItem {
  private question: string;
  private answer: string;
  private state: FAQState;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
    this.state = new CollapsedState(); // default = closed
  }

  toggle(): void {
    this.state.toggle(this);
  }

  setState(newState: FAQState): void {
    this.state = newState;
  }

  isOpen(): boolean {
    return this.state.isExpanded();
  }

  getQuestion(): string {
    return this.question;
  }

  getAnswer(): string {
    return this.answer;
  }
}
