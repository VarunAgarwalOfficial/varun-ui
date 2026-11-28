// The TeX macros every deck can use, in KaTeX and in pixel maths alike.
// One table: the decks, crisptex and make check all read this file.
// Add a macro here, never in a deck, so the decks keep one notation.
(function (g) {
  g.DeckMacros = {
    // Number sets.
    '\\N': '\\mathbb{N}',
    '\\Z': '\\mathbb{Z}',
    '\\Q': '\\mathbb{Q}',
    '\\R': '\\mathbb{R}',
    '\\B': '\\mathbb{B}',

    // Brackets that grow with what is inside.
    '\\set': '\\left\\{ #1 \\right\\}',
    '\\abs': '\\left\\lvert #1 \\right\\rvert',
    '\\floor': '\\left\\lfloor #1 \\right\\rfloor',
    '\\ceil': '\\left\\lceil #1 \\right\\rceil',
    '\\paren': '\\left( #1 \\right)',

    // Sets (COMP9020): set-builder bar, power set, complement, size.
    '\\st': '\\mid',
    '\\pow': '\\mathcal{P}',
    '\\comp': '\\overline{#1}',
    '\\card': '\\left\\lvert #1 \\right\\rvert',

    // Logic and proof. Short arrows read better on a slide than KaTeX's long ones.
    '\\implies': '\\mathrel{\\Rightarrow}',
    '\\iff': '\\mathrel{\\Leftrightarrow}',
    '\\IH': '\\text{IH}',
    '\\defeq': '\\mathrel{:=}',

    // Numbers: divides, and does not divide.
    '\\divides': '\\mid',
    '\\ndivides': '\\nmid',

    // Languages and machines (COMP2022): empty string, language of, alphabet star.
    // \langof, not \lang: KaTeX's \lang is the angle bracket.
    '\\eps': '\\varepsilon',
    '\\langof': '\\mathcal{L}\\left( #1 \\right)',
    '\\Sstar': '\\Sigma^{*}',

    // Functions.
    '\\dom': '\\operatorname{dom}',
    '\\ran': '\\operatorname{ran}',

    // Part of an equation as a fragment: \class{fragment}{x + 1}.
    // Also \class{hl}{...} to mark a term in the deck's highlight colour.
    '\\class': '\\htmlClass{#1}{#2}',
  };
})(globalThis);
