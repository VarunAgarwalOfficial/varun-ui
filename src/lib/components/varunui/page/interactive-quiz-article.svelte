<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  interface ContentBlock {
    type: "paragraph" | "heading" | "subheading" | "list" | "quote";
    content?: string;
    items?: string[];
  }

  interface QuizOption {
    label: string;
  }

  interface QuizQuestion {
    question: string;
    options: QuizOption[];
    correctAnswer: number;
    explanation?: string;
  }

  interface Labels {
    questionOf?: string;
    questionsLabel?: string;
    explanation?: string;
    checkAnswer?: string;
    nextQuestion?: string;
    seeResults?: string;
    congratulations?: string;
    keepLearning?: string;
    passedMessage?: string;
    failedMessage?: string;
    outOfCorrect?: string;
    tryAgain?: string;
    shareResult?: string;
    shareResultHref?: string;
  }

  export interface InteractiveQuizArticleProps {
    title?: string;
    summary?: string;
    date?: string;
    estimatedTime?: string;
    heroImage?: {
      src: string;
      alt: string;
    };
    category?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
    content?: ContentBlock[];
    questions?: QuizQuestion[];
    passingScore?: number;
    labels?: Labels;
    className?: string;
  }

  export const interactiveQuizArticleDemo: InteractiveQuizArticleProps = {
    title: "Test Your JavaScript Knowledge",
    summary:
      "Think you know JavaScript? Put your skills to the test with these 5 questions covering fundamentals to advanced concepts.",
    date: "January 18, 2026",
    estimatedTime: "5 minutes",
    heroImage: {
      src: peepStanding12Asset,
      alt: "JavaScript code",
    },
    category: "Quiz",
    difficulty: "Medium",
    content: [
      {
        type: "paragraph",
        content: "Test your understanding of JavaScript fundamentals with this interactive quiz.",
      },
    ],
    labels: {
      questionOf: "Question {current} of {total}",
      questionsLabel: "questions",
      explanation: "Explanation",
      checkAnswer: "Check Answer",
      nextQuestion: "Next Question",
      seeResults: "See Results",
      congratulations: "Congratulations!",
      keepLearning: "Keep Learning!",
      passedMessage: "You passed the quiz with flying colors!",
      failedMessage: "You need {score}% to pass. Keep practicing!",
      outOfCorrect: "out of {total} correct",
      tryAgain: "Try Again",
      shareResult: "Share Result",
      shareResultHref: "?",
    },
    questions: [
      {
        question: "What will console.log(typeof null) output?",
        options: [
          { label: '"null"' },
          { label: '"object"' },
          { label: '"undefined"' },
          { label: '"boolean"' },
        ],
        correctAnswer: 1,
        explanation:
          'This is a well-known quirk in JavaScript. typeof null returns "object" due to a bug in the original JavaScript implementation that was never fixed for backwards compatibility.',
      },
      {
        question:
          "Which method creates a new array with the results of calling a function on every element?",
        options: [
          { label: "forEach()" },
          { label: "filter()" },
          { label: "map()" },
          { label: "reduce()" },
        ],
        correctAnswer: 2,
        explanation:
          "map() creates a new array populated with the results of calling a provided function on every element. forEach() doesn't return anything, filter() returns matching elements, and reduce() returns a single value.",
      },
      {
        question: "What is the output of: console.log(1 + '2' + 3)?",
        options: [{ label: "6" }, { label: '"123"' }, { label: '"33"' }, { label: "NaN" }],
        correctAnswer: 1,
        explanation:
          'When JavaScript encounters 1 + \'2\', it coerces the number to a string, resulting in "12". Then "12" + 3 becomes "123".',
      },
      {
        question: "Which statement about 'let' and 'const' is FALSE?",
        options: [
          { label: "Both are block-scoped" },
          { label: "const variables cannot be reassigned" },
          { label: "const objects are completely immutable" },
          { label: "Both prevent hoisting to the top of their scope" },
        ],
        correctAnswer: 2,
        explanation:
          "While const prevents reassignment of the variable itself, if the value is an object or array, its properties/elements can still be modified. Only the binding is constant, not the value.",
      },
      {
        question: "What does the '===' operator check?",
        options: [
          { label: "Value equality only" },
          { label: "Type equality only" },
          { label: "Value and type equality" },
          { label: "Reference equality only" },
        ],
        correctAnswer: 2,
        explanation:
          'The strict equality operator (===) checks both value AND type without type coercion. For example, 1 === "1" is false because one is a number and one is a string.',
      },
    ],
    passingScore: 60,
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    Award,
    Calendar,
    ChevronRight,
    Clock,
    QuestionIcon,
    RefreshCw,
    Share2,
    Trophy,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
  import RadioGroupField from "$lib/components/varunui/component/radio-group-field.svelte";
  import { cn } from "$lib/utils.js";

  let props: InteractiveQuizArticleProps = $props();

  const title = $derived(props.title ?? interactiveQuizArticleDemo.title);
  const summary = $derived(props.summary ?? interactiveQuizArticleDemo.summary);
  const date = $derived(props.date ?? interactiveQuizArticleDemo.date);
  const estimatedTime = $derived(props.estimatedTime ?? interactiveQuizArticleDemo.estimatedTime);
  const heroImage = $derived(props.heroImage ?? interactiveQuizArticleDemo.heroImage);
  const category = $derived(props.category ?? interactiveQuizArticleDemo.category);
  const difficulty = $derived(props.difficulty ?? interactiveQuizArticleDemo.difficulty);
  const content = $derived(props.content ?? interactiveQuizArticleDemo.content ?? []);
  const questions = $derived(props.questions ?? interactiveQuizArticleDemo.questions ?? []);
  const passingScore = $derived(props.passingScore ?? interactiveQuizArticleDemo.passingScore ?? 70);
  const labels = $derived({ ...interactiveQuizArticleDemo.labels, ...props.labels });

  let currentQuestion = $state(0);
  let selectedAnswers = $state<Record<number, number | null>>({});
  let showResult = $state(false);
  let showExplanation = $state(false);

  const question = $derived(questions[currentQuestion]);
  const totalQuestions = $derived(questions.length);
  const correctCount = $derived(
    questions.reduce((count, item, index) => count + (selectedAnswers[index] === item.correctAnswer ? 1 : 0), 0),
  );
  const score = $derived(totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0);
  const passed = $derived(score >= passingScore);
  const questionOptions = $derived(
    question?.options.map((option, optionIndex) => ({
      label: option.label,
      value: String(optionIndex),
    })) ?? [],
  );
  const selectedAnswer = $derived(selectedAnswers[currentQuestion]);
  const answerIsCorrect = $derived(
    question ? selectedAnswer === question.correctAnswer : false,
  );

  function selectAnswer(optionIndex: number) {
    if (!showExplanation) {
      selectedAnswers = { ...selectedAnswers, [currentQuestion]: optionIndex };
    }
  }

  function handleNext() {
    showExplanation = false;
    if (currentQuestion < totalQuestions - 1) {
      currentQuestion += 1;
    } else {
      showResult = true;
    }
  }

  function restart() {
    currentQuestion = 0;
    selectedAnswers = {};
    showResult = false;
    showExplanation = false;
  }

</script>

{#snippet ContentBlockView(block: ContentBlock)}
  {#if block.type === "paragraph"}
    <p class="text-lg leading-relaxed text-muted-foreground">{block.content}</p>
  {:else if block.type === "heading"}
    <h2 class="text-2xl font-semibold">{block.content}</h2>
  {:else if block.type === "subheading"}
    <h3 class="text-xl font-semibold">{block.content}</h3>
  {:else if block.type === "list"}
    <ul class="list-disc space-y-2 pl-4">
      {#each block.items ?? [] as item}
        <li class="text-muted-foreground">{item}</li>
      {/each}
    </ul>
  {:else if block.type === "quote"}
    <blockquote class="border-l-4 border-primary pl-4 text-muted-foreground italic">{block.content}</blockquote>
  {/if}
{/snippet}

<div class={cn("w-full bg-background text-foreground", props.className)}>
  <Section container="sm">
    <article>
    {#if heroImage}
      <div class="relative mb-8 aspect-video overflow-hidden rounded-md bg-muted">
        <img class="absolute inset-0 size-full object-cover" src={heroImage.src} alt={heroImage.alt} />
      </div>
    {/if}

    <header class="mb-8 text-center">
      <div class="mb-4 flex justify-center gap-2">
        {#if category}
          <Badge variant="muted" class="gap-1.5">
            <QuestionIcon class="size-3" />
            {category}
          </Badge>
        {/if}
        {#if difficulty}
          <Badge variant={difficulty === "Hard" ? "danger" : "outline"}>{difficulty}</Badge>
        {/if}
      </div>
      {#if title}
        <h1 class="text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {/if}
      {#if summary}
        <p class="mx-auto mt-3 max-w-[var(--layout-prose)] text-lg text-muted-foreground">{summary}</p>
      {/if}
      <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        {#if date}
          <span class="flex items-center gap-1.5"><Calendar class="size-4" />{date}</span>
        {/if}
        {#if estimatedTime}
          <span class="flex items-center gap-1.5"><Clock class="size-4" />{estimatedTime}</span>
        {/if}
        <span class="flex items-center gap-1.5">
          <QuestionIcon class="size-4" />
          {totalQuestions} {labels.questionsLabel}
        </span>
      </div>
    </header>

    {#if content.length > 0}
      <div class="mb-8 space-y-4">
        {#each content as block}
          {@render ContentBlockView(block)}
        {/each}
      </div>
    {/if}

    {#if !showResult}
      <div class="bg-muted/30 p-6">
        <div class="mb-6">
          <div class="mb-2 flex justify-between text-sm">
            <span class="text-muted-foreground">
              {labels.questionOf
                ?.replace("{current}", String(currentQuestion + 1))
                .replace("{total}", String(totalQuestions))}
            </span>
            <span class="font-medium">{Math.round(((currentQuestion + 1) / Math.max(totalQuestions, 1)) * 100)}%</span>
          </div>
          <ProgressMeter
            value={currentQuestion + 1}
            max={Math.max(totalQuestions, 1)}
            size="md"
            ariaLabel="Quiz progress"
          />
        </div>

        {#if question}
          <h2 class="mb-6 text-2xl font-semibold">{question.question}</h2>
          <RadioGroupField
            label="Choose one answer"
            options={questionOptions}
            value={selectedAnswer === undefined ? "" : String(selectedAnswer)}
            disabled={showExplanation}
            onValueChange={(value) => selectAnswer(Number(value))}
          />

          {#if showExplanation && question.explanation}
            <div class={cn("mt-6 border-l-4 p-4", answerIsCorrect ? "border-success bg-success/10" : "border-danger bg-danger/10")}>
              <p class="font-medium">
                {answerIsCorrect ? "Correct." : "Not quite."} {labels.explanation}
              </p>
              <p class="mt-1 text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          {/if}

          <div class="mt-6 flex justify-end">
            {#if !showExplanation}
              <Button
                disabled={selectedAnswers[currentQuestion] === undefined}
                onclick={() => (showExplanation = true)}
              >
                {labels.checkAnswer}
              </Button>
            {:else}
              <Button onclick={handleNext} class="gap-2">
                {#if currentQuestion < totalQuestions - 1}
                  {labels.nextQuestion}
                  <ChevronRight class="size-4" />
                {:else}
                  {labels.seeResults}
                  <Trophy class="size-4" />
                {/if}
              </Button>
            {/if}
          </div>
        {/if}
      </div>
    {:else}
      <div class="bg-muted/30 p-8 text-center">
        <div class={cn("mx-auto mb-4 flex size-20 items-center justify-center rounded-full", passed ? "bg-success/10" : "bg-danger/10")}>
          {#if passed}
            <Trophy class="size-10 text-success" />
          {:else}
            <Award class="size-10 text-danger" />
          {/if}
        </div>
        <h2 class="text-2xl font-bold">{passed ? labels.congratulations : labels.keepLearning}</h2>
        <p class="mt-2 text-muted-foreground">
          {passed ? labels.passedMessage : labels.failedMessage?.replace("{score}", String(passingScore))}
        </p>
        <div class="my-6 border-y bg-muted/50 p-6">
          <p class="text-5xl font-bold">{score}%</p>
          <p class="mt-1 text-sm text-muted-foreground">
            {correctCount} {labels.outOfCorrect?.replace("{total}", String(totalQuestions))}
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onclick={restart} class="gap-2">
            <RefreshCw class="size-4" />
            {labels.tryAgain}
          </Button>
          <Button href="?" class="gap-2">
            <Share2 class="size-4" />
            {labels.shareResult}
          </Button>
        </div>
      </div>
    {/if}
    </article>
  </Section>
</div>
