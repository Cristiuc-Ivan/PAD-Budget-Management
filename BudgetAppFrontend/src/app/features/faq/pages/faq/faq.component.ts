import { Component } from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqs = [
    { question: "How can I track my expenses?", answer: "Use budgeting tools or apps to categorize and monitor your expenses." },
    { question: "What's the 50/30/20 rule?", answer: "A budget strategy that allocates 50% of income to needs, 30% to wants, and 20% to savings." },
    { question: "How do I create a monthly budget?", answer: "Start by listing all income sources and subtracting monthly expenses to determine savings." },
    { question: "What is the envelope budgeting method?", answer: "Use physical or digital envelopes to allocate specific amounts for different spending categories each month." },
    { question: "How can I reduce monthly expenses?", answer: "Identify non-essential costs, negotiate bills, and consider switching to more affordable alternatives." },
    { question: "Why is emergency savings important?", answer: "It provides financial security for unexpected expenses, like medical bills or car repairs." },
    { question: "How do I set realistic financial goals?", answer: "Break down goals into achievable steps, considering income, expenses, and timeframes." },
    { question: "What are common budgeting mistakes?", answer: "Failing to track expenses, underestimating costs, and not adjusting for irregular income." },
    { question: "How can I manage irregular income effectively?", answer: "Set aside a portion of high-income months for low-income periods and focus on essential expenses." },
    { question: "What tools can help with budgeting?", answer: "Budgeting apps, spreadsheets, and bank tools that categorize spending and track income." },
  ];
}
