/**
 * @fileOverview Definition of the certification question pool for GreenNodes Core.
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  category: 'FinOps' | 'GreenOps' | 'Architecture';
}

export const gnrQuestionPool: QuizQuestion[] = [
  {
    id: 1,
    category: 'FinOps',
    question: "Which metric accurately measures the cost consequence of an un-remediated, idle cloud compute instance over a defined duration?",
    options: [
      "Amortized Elasticity Overhead",
      "Cost Escape Burn Rate",
      "Baseline Allocation Skew",
      "Deferred Provisioning Liability"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 2,
    category: 'GreenOps',
    question: "Under the Green Software Foundation (GSF) standards, what does the Software Carbon Intensity (SCI) equation primarily optimize?",
    options: [
      "Total data center square footage power draws",
      "Carbon emissions per unit of software operational work",
      "The lifecycle offset tokens purchased annually",
      "Hardware manufacturing carbon debt exclusively"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 3,
    category: 'Architecture',
    question: "When developing ServiceNow Next Experience custom components externally, what protects your CSS from global stylesheet pollution?",
    options: [
      "Scoping via Native Shadow DOM",
      "Sass Mixin Variable Injections",
      "UI Builder Canvas Layout Hardcoding",
      "GlideSystem Server Script Exclusions"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 4,
    category: 'FinOps',
    question: "What is the primary operational objective when compressing Time-to-Remediation (TTR) via ChatOps hooks?",
    options: [
      "Eliminating the need for multi-cloud security audits",
      "Minimizing the lifespan of active, structural cloud waste leaks",
      "Automatically downscaling production databases during working hours",
      "Reducing the number of engineering seats active on the platform"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 5,
    category: 'GreenOps',
    question: "Cloud compute energy consumption mapped directly to the purchased grid electricity powering the host data center falls under which GHG Protocol standard?",
    options: [
      "Scope 1 Emissions",
      "Scope 2 Emissions",
      "Scope 3 Emissions",
      "Scope 4 Avoided Emissions"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 6,
    category: 'Architecture',
    question: "Why should intense optimization math, such as matrix calculus or C++ binaries, be executed outside of ServiceNow native runtime engines?",
    options: [
      "ServiceNow restricts outbound REST connection calls entirely",
      "The platform runtime operates on a JavaScript engine not optimized for high-performance matrix calculations",
      "Next Experience workspaces cannot render external data tables dynamically",
      "The UI Builder requires all application code to be written in compiled Python"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 7,
    category: 'FinOps',
    question: "What does an 'Idle Variance Percentage' of 95% on an active 16-core server instance signal to a FinOps analyst?",
    options: [
      "The instance is successfully running tasks at peak optimization limits",
      "The resource is massively over-provisioned, maintaining a 5% average operational utilization",
      "The cloud billing engine has applied a 95% discount structure",
      "The instance has disconnected from the primary API configuration route"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 8,
    category: 'GreenOps',
    question: "Which computational process reduces carbon overhead by shifting workloads dynamically to geographic zones with cleaner energy grids?",
    options: [
      "Temporal Carbon Throttling",
      "Spatial Carbon Awareness Optimization",
      "Linear Resource Minimization",
      "Symmetric Capacity Downscaling"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 9,
    category: 'Architecture',
    question: "Which ServiceNow CLI core extension tool compiles and packages locally developed web components for cloud instance deployment?",
    options: [
      "snc app-engine deploy",
      "snc ui-component",
      "snc next-exp-init",
      "snc seismic-compile"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 10,
    category: 'FinOps',
    question: "In standard Cloud FinOps frameworks, which phase is focused on continuous execution, micro-remediations, and architectural accountability loops?",
    options: [
      "Inform Phase",
      "Optimize Phase",
      "Operate Phase",
      "Incorporate Phase"
    ],
    correctAnswerIndex: 2
  }
];

/**
 * Utility to shuffle and pull exactly 10 questions randomly from the core pool
 */
export const generateGnrExam = (): QuizQuestion[] => {
  return [...gnrQuestionPool].sort(() => Math.random() - 0.5).slice(0, 10);
};
